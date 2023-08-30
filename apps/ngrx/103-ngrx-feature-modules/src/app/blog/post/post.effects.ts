import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, concatMap, EMPTY, of, map } from 'rxjs';

// import * as PostActions from './post.actions';

@Injectable()
export class PostEffects {
  //   loadPosts$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(PostActions.loadPosts),
  //       concatMap(() =>
  //         /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //         EMPTY.pipe(
  //           map(data => PostActions.loadPostsSuccess({ data })),
  //           catchError(error => of(PostActions.loadPostsFailure({ error }))))
  //       )
  //     );
  //   });
  //   constructor(private actions$: Actions) {}
}
