import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { HomeTaskState } from '../home-task.state';
import { globalActions } from '../state';
import { WorkTaskState } from '../work-task.state';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss']
})
export class NotificationManagerComponent {
  constructor(private store: Store) {
    const workTasks: WorkTaskState = {
      done: [
        'file paperwork',
        'send emails',
        'work on project A',
        'submit report to manager'
      ],
      todo: ['work on project B', 'update task list']
    };

    const homeTasks: HomeTaskState = {
      done: [
        'cook dinner',
        'go grocery shopping',
        'sweep the floors',
        'do the laundry'
      ],
      todo: ['fix the leaky faucet', 'mow the lawn']
    };

    store.dispatch(
      globalActions.tasksReceived({ workTasks, homeTasks })
    );
  }

  completeAll() {
    this.store.dispatch(globalActions.completeAll());
  }
}
