import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-third',
  template: `
    <div class="outline-box">Third Component</div>
  `,
  styleUrls: ['./third.component.scss'],
  encapsulation: ViewEncapsulation.Emulated, // this is the default
  // encapsulation: ViewEncapsulation.None
  standalone: true
})
export class ThirdComponent {}
