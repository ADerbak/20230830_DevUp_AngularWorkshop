import { createSelector } from '@ngrx/store';

import { selectCurrentUserId } from '../../router.selectors';

import { userFeature } from './user.reducer';

export const { selectUsers } = userFeature;

export const selectCurrentUser = createSelector(
  selectUsers,
  selectCurrentUserId,
  (users, userId) => users.find(user => user.id === userId)
);
