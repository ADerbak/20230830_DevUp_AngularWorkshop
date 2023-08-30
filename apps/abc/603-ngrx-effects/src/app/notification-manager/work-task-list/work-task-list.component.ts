import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TodoListComponent } from '../../todo-list/todo-list.component';
import {
  selectDoneWork,
  selectTodoWork,
  workTaskActions
} from '../../work-tasks.state';

@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  standalone: true,
  imports: [TodoListComponent, AsyncPipe]
})
export class WorkTaskListComponent {
  done: Observable<string[]>;
  todo: Observable<string[]>;

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

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
