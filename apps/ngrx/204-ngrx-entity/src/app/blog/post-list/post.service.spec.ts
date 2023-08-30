import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { keyBy } from 'lodash-es';
import { firstValueFrom } from 'rxjs';

import { mockPosts } from '../post/mock.posts';

import { PostService } from './post.service';

describe('PostService', () => {
  let postSvc: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            post: {
              ids: mockPosts.map(post => post.id),
              entities: keyBy(mockPosts, 'id')
            }
          }
        })
      ]
    });

    postSvc = TestBed.inject(PostService);
  });

  describe('getPostsByUser', () => {
    it('should return the posts', async () => {
      const result = await firstValueFrom(postSvc.getPostsByUser(1));

      expect(result).toEqual([mockPosts[0], mockPosts[1]]);
    });
  });
});
