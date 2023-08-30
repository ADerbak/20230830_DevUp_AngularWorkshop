import { createActionGroup, props } from '@ngrx/store';

import { TaskState } from './tasks.reducer';

export const taskPageActions = createActionGroup({
  source: 'Task Page',
  events: {
    'Task Completed': props<{ task: string }>(),
    'Task Reset': props<{ task: string }>()
  }
});

export const taskApiActions = createActionGroup({
  source: 'Task Api',
  events: {
    'Tasks Received': props<{ tasks: TaskState }>()
  }
});
