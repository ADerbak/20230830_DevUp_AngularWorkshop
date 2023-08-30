import { Component } from '@angular/core';

import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private notificationService: NotificationsService) {}
  registerForNotifications() {
    this.notificationService.registerForNotifications();
  }
}
