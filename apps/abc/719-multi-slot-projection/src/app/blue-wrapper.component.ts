import { Component } from '@angular/core';

@Component({
  selector: 'app-blue-wrapper',
  styles: [
    '.outer { border: 3px solid blue; }',
    '.inner { border: 3px dotted blue; }'
  ],
  template: `
    <article class="outer">
      <h2>
        <ng-content select="app-blue-wrapper-heading"></ng-content>
      </h2>
      <article class="inner">
        <ng-content select="app-blue-wrapper-content"></ng-content>
      </article>
    </article>
  `,
  standalone: true
})
export class BlueWrapperComponent {}

@Component({
  selector: 'app-blue-wrapper-heading, app-blue-wrapper-content',
  template: `
    <ng-content></ng-content>
  `,
  standalone: true
})
export class BlueWrapperChildrenComponent {}
