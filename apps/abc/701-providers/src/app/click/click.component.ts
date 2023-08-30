import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import { ClickService } from '../click.service';

@Component({
  selector: 'app-local-click',
  template: `
    <button>
      <img src="assets/logo.png" (click)="increment()" />
    </button>
    <h4># of Clicks: {{ totalClicks | async }}</h4>
  `,
  styleUrls: ['./click.component.scss'],
  standalone: true,
  imports: [AsyncPipe]
})
export class ClickComponent {
  readonly totalClicks = this.service.clickCount;

  constructor(private service: ClickService) {}

  increment() {
    this.service.increment().catch(err => console.log(err));
  }
}
