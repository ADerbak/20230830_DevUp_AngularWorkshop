import { Component, Input } from '@angular/core';
import {
  bufferCount,
  concat,
  filter,
  map,
  Observable,
  range
} from 'rxjs';

import { FxDataService } from '../fx-data.service';
import { FxQuote, placeholderQuote } from '../fx-quote';

@Component({
  selector: 'app-pair-history',
  templateUrl: './pair-history.component.html'
})
export class PairHistoryComponent {
  @Input() pair = '';

  latest: Observable<FxQuote[]>;

  constructor(fxDataService: FxDataService) {
    this.latest = concat(
      range(1, 10).pipe(map(_v => placeholderQuote)),
      fxDataService.fxData.pipe(filter(fx => fx.symbol === this.pair))
    ).pipe(bufferCount(10, 1));
  }
}
