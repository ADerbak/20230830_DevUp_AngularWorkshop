import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

import { FxQuote } from './fx-quote';
import { SseService } from './sse.service';

const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class FxDataService {
  fxData: Observable<FxQuote>;

  constructor(sse: SseService) {
    this.fxData = sse
      .observe<FxQuote>(apiUrl + '/fx/lowfreq')
      .pipe(share());
  }
}
