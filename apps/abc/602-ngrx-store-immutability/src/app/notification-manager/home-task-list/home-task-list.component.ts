import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectDoneHome,
  selectTodoHome,
  homeTaskActions
} from '../../home-task.state';
import { TodoListComponent } from '../../todo-list/todo-list.component';

/*
  Components now pass and receive information between themselves
  and the store
*/
@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  standalone: true,
  imports: [TodoListComponent, AsyncPipe]
})
export class HomeTaskListComponent {
  done: Observable<string[]>;
  todo: Observable<string[]>;

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

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
