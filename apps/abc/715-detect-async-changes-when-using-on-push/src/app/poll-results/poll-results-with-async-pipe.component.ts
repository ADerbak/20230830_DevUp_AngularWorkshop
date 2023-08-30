import { NgFor, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { PollResult } from './poll-results-types';
import { PollResultsService } from './poll-results.service';

@Component({
  selector: 'app-poll-results-with-async-pipe',
  templateUrl: './poll-results-with-async-pipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class PollResultsWithAsyncPipeComponent {
  pollResults: Observable<PollResult[]>;

  constructor(private pollSvc: PollResultsService) {
    this.pollResults = this.pollSvc.pollResults();
  }
}
