import { Component } from '@angular/core';

import { PollResultsWithAsyncPipeComponent } from './poll-results/poll-results-with-async-pipe.component';
import { PollResultsWithManualSubscribeComponent } from './poll-results/poll-results-with-manual-subscribe.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    PollResultsWithManualSubscribeComponent,
    PollResultsWithAsyncPipeComponent
  ]
})
export class AppComponent {}
