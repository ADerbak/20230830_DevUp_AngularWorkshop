import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '../types';

export const userInitActions = createActionGroup({
  source: 'User Init',
  events: {
    'Load Users': emptyProps()
  }
});

export const userApiActions = createActionGroup({
  source: 'User Api',
  events: {
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: unknown }>()
  }
});
