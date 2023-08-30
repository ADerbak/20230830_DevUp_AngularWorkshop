import { Component } from '@angular/core';

@Component({
  selector: 'app-green-wrapper',
  styles: ['article { border: 3px solid green; }'],
  template: `
    <article>
      <ng-content select="[header]"></ng-content>
      <ng-content select="[body]"></ng-content>
    </article>
  `,
  standalone: true
})
export class GreenWrapperComponent {}
