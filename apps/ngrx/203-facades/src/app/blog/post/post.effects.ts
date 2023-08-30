import { Injectable } from '@angular/core';
import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, filter, map, of, tap } from 'rxjs';

import { PostLoaderService } from '../post-list/post-loader.service';

import {
  postApiActions,
  postInitActions,
  postListPageActions,
  postPageActions
} from './post.actions';

@Injectable()
export class PostEffects implements OnInitEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postInitActions.loadPosts),
      concatMap(() =>
        this.postLoaderService.load().pipe(
          map(posts => postApiActions.loadPostsSuccess({ posts })),
          catchError(error =>
            of(postApiActions.loadPostsFailure({ error }))
          )
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postListPageActions.createPost),
      concatMap(action =>
        this.postLoaderService.create(action.post).pipe(
          map(post => postApiActions.createPostSuccess({ post })),
          catchError(error =>
            of(postApiActions.createPostFailure({ error }))
          )
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postPageActions.deletePost),
      // Having the confirmation in the component was fine, but we
      // move it here to show an example of how to test a dispatching
      // effect that does not dispatch.
      filter(() =>
        window.confirm('Are you sure you want to delete this post?')
      ),
      concatMap(action =>
        this.postLoaderService.delete(action.post).pipe(
          map(() =>
            postApiActions.deletePostSuccess({
              postId: action.post.id
            })
          ),
          catchError(error =>
            of(postApiActions.deletePostFailure({ error }))
          )
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postPageActions.updatePost),
      concatMap(action =>
        this.postLoaderService.update(action.post).pipe(
          map(() =>
            postApiActions.updatePostSuccess({ post: action.post })
          ),
          catchError(error =>
            of(postApiActions.updatePostFailure({ error }))
          )
        )
      )
    )
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          postApiActions.loadPostsFailure,
          postApiActions.createPostFailure,
          postApiActions.deletePostFailure,
          postApiActions.updatePostFailure
        ),
        tap(({ type, error }) => {
          console.error('Error with', type, error);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private postLoaderService: PostLoaderService
  ) {}

  /**
   * This is a special lifecycle hook - it defines which action
   * initializes the Post feature.
   */
  ngrxOnInitEffects(): Action {
    return postInitActions.loadPosts();
  }
}
