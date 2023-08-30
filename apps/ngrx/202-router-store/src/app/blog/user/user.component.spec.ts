import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  Params,
  convertToParamMap
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, of } from 'rxjs';

import { mockPosts } from '../post/mock.posts';

import { mockUsers } from './mock.users';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let params: Params;

  beforeEach(() => {
    params = {
      userId: '2'
    };

    TestBed.configureTestingModule({
      providers: [
        UserComponent,
        provideMockStore({
          initialState: {
            post: {
              posts: mockPosts
            },
            user: {
              users: mockUsers
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

  describe('user$', () => {
    it('should return the user w/ a match', async () => {
      const result = await firstValueFrom(component.user$);

      expect(result).toEqual(mockUsers[1]);
    });

    it('should handle no match', async () => {
      params['userId'] = '999';

      const result = await firstValueFrom(component.user$);

      expect(result).toBeUndefined();
    });
  });
});
