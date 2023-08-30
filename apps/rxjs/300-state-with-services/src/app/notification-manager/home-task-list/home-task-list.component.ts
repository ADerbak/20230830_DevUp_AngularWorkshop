import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeTaskListService } from './home-task-list.service';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  styleUrls: ['../notification-manager.component.scss']
})
export class HomeTaskListComponent {
  done: Observable<string[]>;
  todo: Observable<string[]>;

  constructor(private positionListService: HomeTaskListService) {
    this.done = positionListService.done;
    this.todo = positionListService.todo;
  }

  homeTask(task: string, complete: boolean) {
    this.positionListService.setHomeTask(task, complete);
  }
}
