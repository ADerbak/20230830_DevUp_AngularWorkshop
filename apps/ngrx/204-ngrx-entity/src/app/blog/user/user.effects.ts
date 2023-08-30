import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  OnInitEffects
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, map, of, tap } from 'rxjs';

import { UserLoaderService } from './user-loader.service';
import { userApiActions, userInitActions } from './user.actions';

@Injectable()
export class UserEffects implements OnInitEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userInitActions.loadUsers),
      concatMap(() =>
        this.userLoaderService.load().pipe(
          map(users => userApiActions.loadUsersSuccess({ users })),
          catchError(error =>
            of(userApiActions.loadUsersFailure({ error }))
          )
        )
      )
    )
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userApiActions.loadUsersFailure),
        tap(({ type, error }) => {
          console.error('Error with', type, error);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userLoaderService: UserLoaderService
  ) {}

  ngrxOnInitEffects(): Action {
    return userInitActions.loadUsers();
  }
}
