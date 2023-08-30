import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { User } from '../types';

import { userApiActions } from './user.actions';

export type State = EntityState<User>;

export const adapter: EntityAdapter<User> =
  createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({});

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,

    on(userApiActions.loadUsersSuccess, (state, action) =>
      adapter.setAll(action.users, state)
    )
  )
});
