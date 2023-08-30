import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  Params,
  Router
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, of } from 'rxjs';

import { AppState } from '../../reducers';
import { Post } from '../types';

import { mockPosts } from './mock.posts';
import { PostComponent } from './post.component';
import { selectCurrentPost } from './post.selectors';

describe('PostComponent', () => {
  let component: PostComponent;
  let params: Params;
  let router: Router;
  let mockStore: MockStore;
  let selectCurrentPostMock: MemoizedSelector<
    AppState,
    Post | undefined
  >;

  beforeEach(() => {
    params = {
      userId: '1'
    };

    TestBed.configureTestingModule({
      providers: [
        PostComponent,
        provideMockStore({
          initialState: {
            post: {
              posts: mockPosts
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap(params))
          }
        }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(PostComponent);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    mockStore = TestBed.inject(MockStore);
    // We could put currentPostId in the initialState that we pass to
    // provideMockStore, but this approach will work better with
    // RouterStore.
    selectCurrentPostMock = mockStore.overrideSelector(
      selectCurrentPost,
      mockPosts[1]
    );
  });

  describe('post$', () => {
    it('should handle no post', async () => {
      selectCurrentPostMock.setResult(undefined);

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
      selectCurrentPostMock.setResult(mockPosts[2]);

      const result = await firstValueFrom(component.post$);

      expect(result).toBeUndefined();

      expect(router.navigate).toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    });
  });
});
