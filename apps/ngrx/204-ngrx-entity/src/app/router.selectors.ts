import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  postIdQueryParam,
  userIdRouteParam
} from './routing-parameters';

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

const selectCurrentUserIdParam = selectRouteParam(userIdRouteParam);

export const selectCurrentUserId = createSelector(
  selectCurrentUserIdParam,
  userId => (userId ? Number(userId) : undefined)
);
