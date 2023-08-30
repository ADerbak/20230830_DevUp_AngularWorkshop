import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  homeTaskActions,
  selectDoneHome,
  selectTodoHome
} from '../../home-task.state';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html'
})
export class HomeTaskListComponent {
  done: Observable<string[]>;
  todo: Observable<string[]>;

  constructor(private store: Store) {
    this.done = store.select(selectDoneHome);
    this.todo = store.select(selectTodoHome);
  }

  taskCompleted(task: string) {
    this.store.dispatch(homeTaskActions.taskCompleted({ task }));
  }

  taskReset(task: string) {
    this.store.dispatch(homeTaskActions.taskReset({ task }));
  }
}
