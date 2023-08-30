import { Component } from '@angular/core';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { HomeTaskListService } from './home-task-list/home-task-list.service';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';
import { WorkTaskListService } from './work-task-list/work-task-list.service';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss'],
  standalone: true,
  imports: [WorkTaskListComponent, HomeTaskListComponent]
})
export class NotificationManagerComponent {
  constructor(
    private workTaskListService: WorkTaskListService,
    private homeTaskListService: HomeTaskListService
  ) {}

  completeAll() {
    this.homeTaskListService.completeAll();
    this.workTaskListService.completeAll();
  }
}
