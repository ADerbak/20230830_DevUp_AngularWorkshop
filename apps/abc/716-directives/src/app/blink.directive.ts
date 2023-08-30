import {
  Directive,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription, interval, map } from 'rxjs';

@Directive({
  selector: '[appBlink]',
  standalone: true
})
export class BlinkDirective implements OnDestroy, OnInit {
  @HostBinding('style.visibility') viz = 'visible';
  @Input() set speed(rawSpeed: number | string) {
    this.stop();
    this.start(Number(rawSpeed) || 500);
  }

  private intervalSubscription: Subscription | undefined;

  ngOnInit() {
    if (!this.intervalSubscription) {
      this.start(500);
    }
  }

  start(ms: number) {
    this.intervalSubscription = interval(ms)
      .pipe(
        map(() => (this.viz === 'visible' ? 'hidden' : 'visible'))
      )
      .subscribe(visibility => (this.viz = visibility));
  }

  stop() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = undefined;
    }
  }

  ngOnDestroy() {
    this.stop();
  }
}
