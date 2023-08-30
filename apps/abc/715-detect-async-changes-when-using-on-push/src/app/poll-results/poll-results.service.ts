import { Injectable } from '@angular/core';
import {
  Observable,
  interval,
  of,
  startWith,
  switchMap,
  take
} from 'rxjs';

import { PollResult } from './poll-results-types';

const SERVER_DATA: PollResult[] = [
  {
    name: 'Glazed',
    votes: 0
  },
  {
    name: 'Chocolate',
    votes: 0
  },
  {
    name: 'Powdered',
    votes: 0
  },
  {
    name: 'Jelly',
    votes: 0
  }
];

@Injectable({
  providedIn: 'root'
})
export class PollResultsService {
  pollResults(): Observable<PollResult[]> {
    return interval(1000).pipe(
      startWith(1),
      switchMap(() => this.pullUpdatedResultsFromServer()),
      take(100)
    );
  }

  /* Simulate fetching latest results from a server */
  private pullUpdatedResultsFromServer() {
    SERVER_DATA.forEach(
      pr => (pr.votes += Math.floor(Math.random() * 100))
    );
    const copyOfData = SERVER_DATA.map(pr => ({ ...pr }));

    // return as observable to simulate async call
    return of(copyOfData);
  }
}
