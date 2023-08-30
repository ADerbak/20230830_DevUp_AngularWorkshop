import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { CounterDisplayComponent } from './counter-display.component';
import { AppState, emptyCart, pickApples, pickBerry } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CounterDisplayComponent, AsyncPipe]
})
export class AppComponent {
  berry: Observable<number>;
  apple: Observable<number>;
  total: Observable<number>;

  // We will learn a better way (that doesn't violate linting) in the
  // next step.
  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(private store: Store<AppState>) {
    // eslint-disable-next-line @ngrx/prefer-selector-in-select
    this.berry = store.select(myAppState => myAppState.berryCounter);
    // eslint-disable-next-line @ngrx/prefer-selector-in-select
    this.apple = store.select(state => state.appleCounter);
    // Internally, store.select uses RxJS that looks like this:
    this.total = store.pipe(
      map(s => s.berryCounter + s.appleCounter)
    );
  }

  pickBerry() {
    this.store.dispatch(pickBerry());
  }

  pickApple(count: number) {
    this.store.dispatch(pickApples({ count }));
  }

  empty() {
    this.store.dispatch(emptyCart());
  }
}
