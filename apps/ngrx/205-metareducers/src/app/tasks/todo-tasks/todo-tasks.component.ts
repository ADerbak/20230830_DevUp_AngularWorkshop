import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { taskPageActions } from '../tasks.actions';
import { selectTodo } from '../tasks.selectors';

@Component({
  selector: 'app-todo-tasks',
  template: `
    <app-todo-list
      [list]="(done | async) ?? []"
      [selected]="false"
      (setTaskStatus)="task($event)"
    ></app-todo-list>
  `
})
export class TodoTasksComponent {
  done: Observable<string[]>;

  constructor(private store: Store) {
    this.done = store.select(selectTodo);
  }

  task(task: string) {
    this.store.dispatch(taskPageActions.taskCompleted({ task }));
  }
}
