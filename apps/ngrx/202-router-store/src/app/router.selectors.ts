import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { postIdQueryParam } from './routing-parameters';

export interface State {
  router: fromRouter.RouterReducerState;
}

export const selectRouter =
  createFeatureSelector<fromRouter.RouterReducerState>('router');

export const { selectRouteParam, selectQueryParam } =
  fromRouter.getRouterSelectors(selectRouter);

const selectCurrentPostIdParam = selectQueryParam(postIdQueryParam);

export const selectCurrentPostId = createSelector(
  selectCurrentPostIdParam,
  postId => (postId ? Number(postId) : undefined)
);
