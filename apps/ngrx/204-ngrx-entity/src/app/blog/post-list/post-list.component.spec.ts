import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { createSpyObj } from 'jest-createspyobj';
import { ReplaySubject, Subject, firstValueFrom, of } from 'rxjs';

import { ConfigService } from '../../config.service';
import { mockPosts } from '../post/mock.posts';
import { UserService } from '../user/user.service';

import { PostListComponent } from './post-list.component';
import { PostService } from './post.service';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let configSvc: jest.Mocked<ConfigService>;
  let postSvc: jest.Mocked<PostService>;
  let userSvc: UserService;
  let currentUserId: Subject<number>;

  beforeEach(() => {
    configSvc = createSpyObj(ConfigService);
    configSvc.title = of('Blog Title');

    userSvc = createSpyObj(UserService);
    currentUserId = new ReplaySubject(2);
    userSvc.currentUserId = currentUserId;

    postSvc = createSpyObj(PostService);
    postSvc.currentPostId = of(2);

    TestBed.configureTestingModule({
      providers: [
        PostListComponent,
        { provide: ConfigService, useValue: configSvc },
        { provide: PostService, useValue: postSvc },
        { provide: UserService, useValue: userSvc }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(PostListComponent);
  });

  describe('getPostsByUser', () => {
    beforeEach(() => {
      postSvc.getPostsByUser.mockReturnValue(
        of([mockPosts[0], mockPosts[1]])
      );
    });

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
      currentUserId.next(2);

      const result = await firstValueFrom(component.userId);

      expect(result).toEqual(2);
    });

    it('should get the userId on a non-matching userId', async () => {
      currentUserId.next(999);

      const result = await firstValueFrom(component.userId);

      expect(result).toEqual(999);
    });

    it('should handle a missing userId', () => {
      const observerSpy = subscribeSpyTo(component.userId);

      expect(observerSpy.receivedNext()).toEqual(false);
    });
  });

  describe('posts', () => {
    it('should get the posts', async () => {
      currentUserId.next(2);
      postSvc.getPostsByUser.mockReturnValue(of([mockPosts[2]]));

      const result = await firstValueFrom(component.posts);

      expect(result).toEqual([mockPosts[2]]);
      expect(postSvc.getPostsByUser).toHaveBeenCalledWith(2);
    });
  });
});
