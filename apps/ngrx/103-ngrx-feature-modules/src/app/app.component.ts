import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { configActions, selectTitle } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = new FormControl();
  destroy = new Subject();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      // This line was the solution for workshop 101, before we learned
      // about memoized selectors in 102.
      // .select(state => state.title),
      .select(selectTitle)
      .pipe(takeUntil(this.destroy))
      .subscribe(titleValue => this.title.setValue(titleValue));
  }

  setTitle() {
    this.store.dispatch(
      configActions.updateTitle({ title: this.title.value })
    );
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
