import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ConfigService } from './config.service';
import { configActions } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = new FormControl();
  destroy = new Subject();

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.title
      .pipe(takeUntil(this.destroy))
      .subscribe(titleValue => this.title.setValue(titleValue));
  }

  setTitle() {
    this.configService.dispatch(
      configActions.updateTitle({ title: this.title.value })
    );
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
