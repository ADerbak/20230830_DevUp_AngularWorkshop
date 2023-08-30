import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { generalActions } from '../state';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss']
})
export class NotificationManagerComponent {
  constructor(private store: Store) {}

  completeAll() {
    this.store.dispatch(generalActions.completeAll());
  }
}
