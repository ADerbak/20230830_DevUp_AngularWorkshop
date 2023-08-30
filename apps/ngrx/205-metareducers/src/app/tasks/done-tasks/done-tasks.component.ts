import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { taskPageActions } from '../tasks.actions';
import { selectDone } from '../tasks.selectors';

@Component({
  selector: 'app-done-tasks',
  template: `
    <app-todo-list
      [list]="(done | async) ?? []"
      [selected]="true"
      (setTaskStatus)="task($event)"
    ></app-todo-list>
  `
})
export class DoneTasksComponent {
  done: Observable<string[]>;

  constructor(private store: Store) {
    this.done = store.select(selectDone);
  }

  task(task: string) {
    this.store.dispatch(taskPageActions.taskReset({ task }));
  }
}
