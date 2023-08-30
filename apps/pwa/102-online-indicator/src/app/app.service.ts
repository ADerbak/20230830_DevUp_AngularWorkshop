import { Injectable } from '@angular/core';
import { fromEvent, mapTo, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  online = merge(
    fromEvent(window, 'online').pipe(mapTo(true)),
    fromEvent(window, 'offline').pipe(mapTo(false)),
    of(navigator.onLine)
  );
}
