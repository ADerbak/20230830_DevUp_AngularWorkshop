import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createSpyObj } from 'jest-createspyobj';
import { firstValueFrom, of } from 'rxjs';

import { ConfigService } from '../../config.service';
import { AppState } from '../../reducers';
import { selectCurrentUserId } from '../../router.selectors';
import { mockPosts } from '../post/mock.posts';

import { PostListComponent } from './post-list.component';
import { PostService } from './post.service';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let configSvc: jest.Mocked<ConfigService>;
  let selectMockCurrentUserId: MemoizedSelector<
    AppState,
    number | undefined
  >;
  let postSvc: jest.Mocked<PostService>;

  beforeEach(() => {
    configSvc = createSpyObj(ConfigService);
    configSvc.title = of('Blog Title');

    postSvc = createSpyObj(PostService);

    TestBed.configureTestingModule({
      providers: [
        PostListComponent,
        provideMockStore({}),
        { provide: ConfigService, useValue: configSvc },
        { provide: PostService, useValue: postSvc }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(PostListComponent);
    const mockStore = TestBed.inject(MockStore);
    selectMockCurrentUserId = mockStore.overrideSelector(
      selectCurrentUserId,
      2
    );
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
      selectMockCurrentUserId.setResult(2);

      const result = await firstValueFrom(component.userId);

      expect(result).toEqual(2);
    });

    it('should get the userId on a non-matching userId', async () => {
      selectMockCurrentUserId.setResult(999);

      const result = await firstValueFrom(component.userId);

      expect(result).toEqual(999);
    });

    it('should handle a missing userId', () => {
      selectMockCurrentUserId.setResult(undefined);

      const observerSpy = subscribeSpyTo(component.userId);

      expect(observerSpy.receivedNext()).toEqual(false);
    });
  });

  describe('posts', () => {
    it('should get the posts', async () => {
      selectMockCurrentUserId.setResult(2);
      postSvc.getPostsByUser.mockReturnValue(of([mockPosts[2]]));

      const result = await firstValueFrom(component.posts);

      expect(result).toEqual([mockPosts[2]]);
      expect(postSvc.getPostsByUser).toHaveBeenCalledWith(2);
    });
  });
});
