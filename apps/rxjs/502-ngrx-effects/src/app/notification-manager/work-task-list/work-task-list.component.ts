import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectDoneWork,
  selectTodoWork,
  workTaskActions
} from '../../work-tasks.state';

@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  styleUrls: ['../notification-manager.component.scss']
})
export class WorkTaskListComponent {
  done: Observable<string[]>;
  todo: Observable<string[]>;

  constructor(private store: Store) {
    this.done = store.select(selectDoneWork);
    this.todo = store.select(selectTodoWork);
  }

  workTask(task: string, complete: boolean) {
    this.store.dispatch(
      workTaskActions.setWorkTask({ task, complete })
    );
  }
}
