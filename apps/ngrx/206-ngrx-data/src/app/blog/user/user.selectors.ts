import { createSelector } from '@ngrx/store';

import { selectCurrentUserId } from '../../router.selectors';

import { adapter, userFeature } from './user.reducer';

export const { selectUserState } = userFeature;

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectUsers = createSelector(selectUserState, selectAll);

const selectUserEntities = createSelector(
  selectUserState,
  selectEntities
);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (entities, userId) => (userId ? entities[userId] : undefined)
);
