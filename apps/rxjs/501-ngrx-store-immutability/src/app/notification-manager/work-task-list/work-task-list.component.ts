import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectDoneWork,
  selectTodoWork,
  workTaskActions
} from '../../work-task.state';

/*
  Components now pass and receive information between itself
  and the store
*/
@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html'
})
export class WorkTaskListComponent {
  done: Observable<string[]>;
  todo: Observable<string[]>;

  constructor(private store: Store) {
    this.done = store.select(selectDoneWork);
    this.todo = store.select(selectTodoWork);
  }

  taskCompleted(task: string) {
    this.store.dispatch(workTaskActions.taskCompleted({ task }));
  }

  taskReset(task: string) {
    this.store.dispatch(workTaskActions.taskReset({ task }));
  }
}
