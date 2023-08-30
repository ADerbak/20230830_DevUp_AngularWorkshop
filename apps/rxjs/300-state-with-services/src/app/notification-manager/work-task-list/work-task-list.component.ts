import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { WorkTaskListService } from './work-task-list.service';
/*
  Components now pass and receive information between itself
  and services
*/
@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  styleUrls: ['../notification-manager.component.scss']
})
export class WorkTaskListComponent {
  done: Observable<string[]>;
  todo: Observable<string[]>;

  constructor(private workTaskListService: WorkTaskListService) {
    this.done = workTaskListService.done;
    this.todo = workTaskListService.todo;
  }

  workTask(task: string, complete: boolean) {
    this.workTaskListService.setWorkTask(task, complete);
  }
}
