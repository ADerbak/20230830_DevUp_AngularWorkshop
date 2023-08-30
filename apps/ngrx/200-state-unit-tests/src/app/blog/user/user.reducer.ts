import { createFeature, createReducer, on } from '@ngrx/store';

import { User } from '../types';

import { userApiActions } from './user.actions';

export interface State {
  users: User[];
}

export const initialState: State = {
  users: []
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(userApiActions.loadUsersSuccess, (state, action) => ({
      ...state,
      users: [...action.users]
    }))
  )
});
