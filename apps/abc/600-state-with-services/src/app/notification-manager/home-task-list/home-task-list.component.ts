import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ToDoListComponent } from '../../todo-list/todo-list.component';

import { HomeTaskListService } from './home-task-list.service';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  standalone: true,
  imports: [ToDoListComponent, AsyncPipe]
})
export class HomeTaskListComponent {
  done: Observable<string[]>;
  todo: Observable<string[]>;

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  constructor(private homeTaskListService: HomeTaskListService) {
    this.done = homeTaskListService.done;
    this.todo = homeTaskListService.todo;
  }

  setStatus(task: string, complete: boolean) {
    this.homeTaskListService.setTaskStatus(task, complete);
  }
}
