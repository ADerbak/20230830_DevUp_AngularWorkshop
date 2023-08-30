import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  instructors = this.appService.instructors;
  constructor(private appService: AppService) {}

  index = 0;

  previous() {
    this.index--;
  }

  next() {
    this.index++;
  }
}
