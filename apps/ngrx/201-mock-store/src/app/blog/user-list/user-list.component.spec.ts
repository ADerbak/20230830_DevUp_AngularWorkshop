import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';

import { mockUsers } from '../user/mock.users';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserListComponent,
        provideMockStore({
          initialState: {
            user: {
              users: mockUsers
            }
          }
        })
      ]
    });

    component = TestBed.inject(UserListComponent);
    mockStore = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('users$', () => {
    it('should handle users', async () => {
      const result = await firstValueFrom(component.users$);

      expect(result).toBe(mockUsers);
    });

    it('should handle empty users', async () => {
      mockStore.setState({
        user: {
          users: []
        }
      });

      const observerSpy = subscribeSpyTo(component.users$);

      expect(observerSpy.receivedNext()).toEqual(false);
    });
  });
});
