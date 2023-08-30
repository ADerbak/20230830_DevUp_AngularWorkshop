import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { createSpyObj } from 'jest-createspyobj';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { User } from '../types';
import { mockUsers } from '../user/mock.users';
import { UserService } from '../user/user.service';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let userSvc: UserService;
  let users: BehaviorSubject<User[]>;

  beforeEach(() => {
    userSvc = createSpyObj(UserService);
    users = new BehaviorSubject(mockUsers);
    userSvc.users = users;

    TestBed.configureTestingModule({
      providers: [
        UserListComponent,
        { provide: UserService, useValue: userSvc }
      ]
    });

    component = TestBed.inject(UserListComponent);
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
      users.next([]);

      const observerSpy = subscribeSpyTo(component.users$);

      expect(observerSpy.receivedNext()).toEqual(false);
    });
  });
});
