import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { createSpyObj } from 'jest-createspyobj';
import { firstValueFrom, of } from 'rxjs';

import { mockPosts } from '../post/mock.posts';
import { PostService } from '../post-list/post.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;

  beforeEach(() => {
    const postSvc = createSpyObj(PostService);
    postSvc.posts = of(mockPosts);

    TestBed.configureTestingModule({
      providers: [
        UserComponent,
        provideMockStore({}),
        { provide: PostService, useValue: postSvc }
      ]
    });

    component = TestBed.inject(UserComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('posts$', () => {
    it('should return the posts', async () => {
      const result = await firstValueFrom(component.posts$);

      expect(result).toEqual(mockPosts);
    });
  });
});
