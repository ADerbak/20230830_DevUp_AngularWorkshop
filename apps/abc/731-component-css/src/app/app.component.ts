import { Component } from '@angular/core';

import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';
import { ThirdComponent } from './third.component';

@Component({
  selector: 'app-root',
  template: `
    <h3>Component CSS &amp; Encapsulation</h3>
    <div class="outline-box">
      <h5>Three components with different styles</h5>
      <app-first></app-first>
      <app-second></app-second>
      <app-third></app-third>
    </div>
  `,
  standalone: true,
  imports: [FirstComponent, SecondComponent, ThirdComponent]
})
export class AppComponent {}
