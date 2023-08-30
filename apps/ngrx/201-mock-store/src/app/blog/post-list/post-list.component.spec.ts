import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  Params,
  convertToParamMap
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, of } from 'rxjs';

import { mockPosts } from '../post/mock.posts';
import { postListPageActions } from '../post/post.actions';

import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let params: Params;
  let queryParams: Params;
  let store: MockStore;

  beforeEach(() => {
    params = {
      userId: '2'
    };
    queryParams = {
      postId: '2'
    };

    TestBed.configureTestingModule({
      providers: [
        PostListComponent,
        provideMockStore({
          initialState: {
            post: {
              posts: mockPosts
            },
            config: {
              title: 'Blog Title'
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap(params)),
            queryParamMap: of(convertToParamMap(queryParams))
          }
        }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(PostListComponent);
    store = TestBed.inject(MockStore);
  });

  describe('getPostsByUser', () => {
    it('should return the posts', async () => {
      const result = await firstValueFrom(
        component.getPostsByUser(1)
      );

      expect(result).toEqual([mockPosts[0], mockPosts[1]]);
    });
  });

  describe('title', () => {
    it('should get the title', async () => {
      const result = await firstValueFrom(component.title);

      expect(result).toEqual('Blog Title');
    });
  });

  describe('userId', () => {
    it('should get the userId on a matching userId', async () => {
      const result = await firstValueFrom(component.userId);

      expect(result).toEqual(2);
    });

    it('should get the userId on a non-matching userId', async () => {
      params['userId'] = '999';

      const result = await firstValueFrom(component.userId);

      expect(result).toEqual(999);
    });
  });

  describe('posts', () => {
    it('should get the posts on a matching userId', async () => {
      const result = await firstValueFrom(component.posts);

      expect(result).toEqual([mockPosts[2]]);
    });

    it('should get the posts on a non-matching userId', async () => {
      params['userId'] = '999';

      const result = await firstValueFrom(component.posts);

      expect(result).toEqual([]);
    });
  });

  describe('selectedPostId', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    it('should get the selectedPostId when it exists', async () => {
      const result = await firstValueFrom(component.selectedPostId);

      expect(result).toEqual(2);
      expect(store.dispatch).toHaveBeenCalledWith(
        postListPageActions.choosePost({ postId: 2 })
      );
    });

    it('should handle a missing postId', async () => {
      queryParams['postId'] = undefined;

      const result = await firstValueFrom(component.selectedPostId);

      expect(result).toBeUndefined();
      expect(store.dispatch).toHaveBeenCalledWith(
        postListPageActions.choosePost({ postId: undefined })
      );
    });
  });
});
