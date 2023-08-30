import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createSpyObj } from 'jest-createspyobj';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';

import { selectCurrentUserId } from '../../router.selectors';
import { PostService } from '../post-list/post.service';
import { Post } from '../types';

import { mockPosts } from './mock.posts';
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let router: Router;
  let mockStore: MockStore;
  let postSvc: jest.Mocked<PostService>;
  let currentPost: Subject<Post | undefined | null>;

  beforeEach(() => {
    postSvc = createSpyObj(PostService);
    currentPost = new BehaviorSubject<Post | undefined | null>(
      mockPosts[1]
    );
    postSvc.currentPost = currentPost;

    TestBed.configureTestingModule({
      providers: [
        PostComponent,
        provideMockStore({}),
        { provide: PostService, useValue: postSvc }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(PostComponent);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectCurrentUserId, 1);
  });

  describe('post$', () => {
    it('should handle undefined post (no query param)', async () => {
      currentPost.next(undefined);

      const result = await firstValueFrom(component.post$);

      expect(result).toBeUndefined();

      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    });

    it('should handle null post (invalid query param)', async () => {
      currentPost.next(null);

      const result = await firstValueFrom(component.post$);

      expect(result).toBeUndefined();

      expect(router.navigate).toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    });

    it('should handle a matched post and user', async () => {
      const result = await firstValueFrom(component.post$);

      expect(result).toEqual(mockPosts[1]);

      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.title.value).toBe('title2');
      expect(component.body.value).toBe('body2');
    });

    it('should handle a mismatched post and user', async () => {
      currentPost.next(mockPosts[2]);

      const result = await firstValueFrom(component.post$);

      expect(result).toBeUndefined();

      expect(router.navigate).toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    });
  });
});
