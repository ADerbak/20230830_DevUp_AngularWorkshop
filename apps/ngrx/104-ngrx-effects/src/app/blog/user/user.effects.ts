import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, concatMap, EMPTY, map, of } from 'rxjs';

// import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  // loadUsers$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(UserActions.loadUsers),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => UserActions.loadUsersSuccess({ data })),
  //         catchError(error => of(UserActions.loadUsersFailure({ error }))))
  //     )
  //   );
  // });
  // constructor(private actions$: Actions) {}
}
