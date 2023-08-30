import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  updateAvailable = this.appService.available;
  updateDenied = false;
  constructor(private appService: AppService) {}

  activateUpdate() {
    this.appService.activateUpdate();
  }

  clearUpdateMessage() {
    this.updateDenied = true;
  }
}
