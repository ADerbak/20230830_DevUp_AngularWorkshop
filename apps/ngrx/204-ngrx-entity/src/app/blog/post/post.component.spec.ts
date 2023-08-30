import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createSpyObj } from 'jest-createspyobj';
import { ReplaySubject, Subject, firstValueFrom, of } from 'rxjs';

import { mockPosts } from '../post/mock.posts';
import { PostService } from '../post-list/post.service';
import { Post } from '../types';
import { UserService } from '../user/user.service';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let router: Router;
  let userSvc: jest.Mocked<UserService>;
  let postSvc: jest.Mocked<PostService>;
  let currentPost: Subject<Post | null | undefined>;

  beforeEach(() => {
    userSvc = createSpyObj(UserService);
    userSvc.currentUserId = of(1);

    postSvc = createSpyObj(PostService);
    currentPost = new ReplaySubject<Post | null | undefined>();
    postSvc.currentPost = currentPost;

    TestBed.configureTestingModule({
      providers: [
        PostComponent,
        { provide: UserService, useValue: userSvc },
        { provide: PostService, useValue: postSvc }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(PostComponent);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
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
      currentPost.next(mockPosts[1]);

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
