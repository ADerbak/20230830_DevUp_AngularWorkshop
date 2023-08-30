import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { createSpyObj } from 'jest-createspyobj';
import { Observable, Subject, of, throwError } from 'rxjs';

import { mockUsers } from './mock.users';
import { UserLoaderService } from './user-loader.service';
import { userApiActions, userInitActions } from './user.actions';
import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;
  let userLoaderMock: jest.Mocked<UserLoaderService>;

  beforeEach(() => {
    actions$ = new Subject<Action>();
    userLoaderMock = createSpyObj(UserLoaderService);

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: UserLoaderService, useValue: userLoaderMock }
      ]
    });

    effects = TestBed.inject(UserEffects);
  });

  describe('loadUsers', () => {
    it('should load users', () => {
      // spy on the service call
      // this makes sure we're not testing the service, just the effect
      userLoaderMock.load.mockReturnValue(of(mockUsers));

      // check that the output of the effect is what we expect it to be
      effects.loadUsers$.subscribe(a => {
        expect(a).toEqual(
          userApiActions.loadUsersSuccess({ users: mockUsers })
        );

        // check that the service was called
        expect(userLoaderMock.load).toHaveBeenCalled();
      });

      // emit an action
      (actions$ as Subject<Action>).next(userInitActions.loadUsers());
    });

    it('should handle user loading failing', () => {
      userLoaderMock.load.mockReturnValue(throwError(() => 'oops'));
      effects.loadUsers$.subscribe(a => {
        expect(a).toEqual(
          userApiActions.loadUsersFailure({ error: 'oops' })
        );
      });
      (actions$ as Subject<Action>).next(userInitActions.loadUsers());
    });
  });
});
