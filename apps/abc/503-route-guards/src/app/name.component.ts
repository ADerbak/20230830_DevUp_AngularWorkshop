import { Component } from '@angular/core';

@Component({
  selector: 'app-some-name',
  template: `
    <article>
      <header>Hello Again!</header>
      This is another example component.
    </article>
  `,
  standalone: true
})
export class NameComponent {}
