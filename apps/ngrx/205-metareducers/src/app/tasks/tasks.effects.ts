import { Injectable } from '@angular/core';
import { OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { taskApiActions } from './tasks.actions';
import { TaskState } from './tasks.reducer';

const initialTasks: TaskState = {
  done: [
    'cook dinner',
    'go grocery shopping',
    'sweep the floors',
    'do the laundry'
  ],
  todo: ['fix the leaky faucet', 'mow the lawn']
};

@Injectable()
export class TasksEffects implements OnInitEffects {
  ngrxOnInitEffects(): Action {
    return taskApiActions.tasksReceived({ tasks: initialTasks });
  }
}
