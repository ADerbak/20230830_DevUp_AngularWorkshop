import { createSelector } from '@ngrx/store';

import { userFeature } from './user.reducer';

export const { selectUsers } = userFeature;

export const selectUser = (id: string | number) =>
  createSelector(selectUsers, users =>
    users.find(user => user.id === +id)
  );
