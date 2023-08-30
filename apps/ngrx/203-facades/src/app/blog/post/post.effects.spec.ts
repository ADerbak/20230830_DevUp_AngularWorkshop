import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { createSpyObj } from 'jest-createspyobj';
import { Observable, of, Subject, throwError } from 'rxjs';

import { PostLoaderService } from '../post-list/post-loader.service';
import { Post } from '../types';

import { mockPosts } from './mock.posts';
import {
  postApiActions,
  postInitActions,
  postListPageActions,
  postPageActions
} from './post.actions';
import { PostEffects } from './post.effects';

describe('PostEffects', () => {
  let actions$: Observable<Action>;
  let effects: PostEffects;
  let postLoaderMock: jest.Mocked<PostLoaderService>;
  let metadata: EffectsMetadata<PostEffects>;

  beforeEach(() => {
    actions$ = new Subject<Action>();
    postLoaderMock = createSpyObj(PostLoaderService);

    TestBed.configureTestingModule({
      providers: [
        PostEffects,
        provideMockActions(() => actions$),
        { provide: PostLoaderService, useValue: postLoaderMock }
      ]
    });

    effects = TestBed.inject(PostEffects);
    metadata = getEffectsMetadata(effects);
  });

  describe('loadPosts', () => {
    it('should load posts', () => {
      // spy on the service call
      // this makes sure we're not testing the service, just the effect
      postLoaderMock.load.mockReturnValue(of(mockPosts));

      // check that the output of the effect is what we expect it to be
      effects.loadPosts$.subscribe(a => {
        expect(a).toEqual(
          postApiActions.loadPostsSuccess({ posts: mockPosts })
        );

        // check that the service was called
        expect(postLoaderMock.load).toHaveBeenCalled();
      });

      // emit an action
      (actions$ as Subject<Action>).next(postInitActions.loadPosts());
    });

    it('should handle post loading failing', () => {
      postLoaderMock.load.mockReturnValue(throwError(() => 'oops'));
      effects.loadPosts$.subscribe(a => {
        expect(a).toEqual(
          postApiActions.loadPostsFailure({ error: 'oops' })
        );
      });
      (actions$ as Subject<Action>).next(postInitActions.loadPosts());
    });
  });

  describe('createPost', () => {
    let newPost: Omit<Post, 'id'>;

    beforeEach(() => {
      newPost = {
        userId: 3,
        title: 'titleNew',
        body: 'bodyNew'
      };
    });

    it('should create a post', () => {
      const newPostWithId = {
        ...newPost,
        id: 4
      };

      postLoaderMock.create.mockReturnValue(of(newPostWithId));
      effects.createPost$.subscribe(a => {
        expect(a).toEqual(
          postApiActions.createPostSuccess({ post: newPostWithId })
        );
      });
      (actions$ as Subject<Action>).next(
        postListPageActions.createPost({ post: newPost })
      );
    });

    it('should handle post creation failing', () => {
      postLoaderMock.create.mockReturnValue(throwError(() => 'oops'));
      effects.createPost$.subscribe(a => {
        expect(a).toEqual(
          postApiActions.createPostFailure({ error: 'oops' })
        );
      });
      (actions$ as Subject<Action>).next(
        postListPageActions.createPost({ post: newPost })
      );
    });
  });

  describe('deletePost', () => {
    let spyConfirm: jest.SpyInstance;

    beforeEach(() => {
      spyConfirm = jest
        .spyOn(window, 'confirm')
        .mockReturnValue(true);

      postLoaderMock.delete.mockReturnValue(of({}));
    });

    it('should handle declining', () => {
      spyConfirm.mockReturnValue(false);

      actions$ = of(
        postPageActions.deletePost({ post: mockPosts[1] })
      );

      const observerSpy = subscribeSpyTo(effects.deletePost$);

      expect(observerSpy.receivedNext()).toEqual(false);

      expect(spyConfirm).toHaveBeenCalled();
      expect(postLoaderMock.delete).not.toHaveBeenCalled();
    });

    it('should delete a post with confirmation', () => {
      postLoaderMock.delete.mockReturnValue(of({}));
      effects.deletePost$.subscribe(a => {
        expect(a).toEqual(
          postApiActions.deletePostSuccess({ postId: 2 })
        );
      });
      (actions$ as Subject<Action>).next(
        postPageActions.deletePost({ post: mockPosts[1] })
      );
    });

    it('should handle post deletion failing after confirmation', () => {
      postLoaderMock.delete.mockReturnValue(throwError(() => 'oops'));
      effects.deletePost$.subscribe(a => {
        expect(a).toEqual(
          postApiActions.deletePostFailure({ error: 'oops' })
        );
      });
      (actions$ as Subject<Action>).next(
        postPageActions.deletePost({ post: mockPosts[1] })
      );
    });
  });

  describe('updatePost', () => {
    let updatedPost: Post;

    beforeEach(() => {
      updatedPost = { ...mockPosts[2], title: 'changedTitle' };
    });

    it('should update a post', () => {
      postLoaderMock.update.mockReturnValue(of(updatedPost));
      effects.updatePost$.subscribe(a => {
        expect(a).toEqual(
          postApiActions.updatePostSuccess({ post: updatedPost })
        );
      });
      (actions$ as Subject<Action>).next(
        postPageActions.updatePost({
          post: updatedPost
        })
      );
    });

    it('should handle post update failing', () => {
      postLoaderMock.update.mockReturnValue(throwError(() => 'oops'));
      effects.updatePost$.subscribe(a => {
        expect(a).toEqual(
          postApiActions.updatePostFailure({ error: 'oops' })
        );
      });
      (actions$ as Subject<Action>).next(
        postPageActions.updatePost({
          post: updatedPost
        })
      );
    });
  });

  describe('handleError', () => {
    it('should not dispatch', () => {
      expect(metadata.handleError$?.dispatch).toBe(false);
    });

    it('should log a value', () => {
      jest.spyOn(console, 'error').mockImplementation();

      const action = postApiActions.loadPostsFailure({
        error: 'oops'
      });

      actions$ = of(action);

      // Note that because we don't transform the stream in any way,
      // the output of the effect is the same as the input.
      const observerSpy = subscribeSpyTo(effects.handleError$);
      expect(observerSpy.getFirstValue()).toEqual(action);

      expect(console.error).toHaveBeenCalled();
    });
  });
});
