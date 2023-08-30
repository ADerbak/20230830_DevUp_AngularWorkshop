import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { generalActions } from '../state';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss'],
  standalone: true,
  imports: [WorkTaskListComponent, HomeTaskListComponent]
})
export class NotificationManagerComponent {
  constructor(private store: Store) {}

  completeAll() {
    this.store.dispatch(generalActions.completeAll());
  }
}
