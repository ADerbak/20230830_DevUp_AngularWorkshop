import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectDoneHome,
  selectTodoHome,
  homeTaskActions
} from '../../home-tasks.state';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  styleUrls: ['../notification-manager.component.scss']
})
export class HomeTaskListComponent {
  done: Observable<string[]>;
  todo: Observable<string[]>;

  constructor(private store: Store) {
    this.done = store.select(selectDoneHome);
    this.todo = store.select(selectTodoHome);
  }

  homeTask(task: string, complete: boolean) {
    this.store.dispatch(
      homeTaskActions.setHomeTask({ task, complete })
    );
  }
}
