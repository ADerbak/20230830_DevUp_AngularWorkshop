import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-component',
  template: `
    <article>
      <header>App Administration</header>
      Welcome, Authorized User!
    </article>
  `,
  standalone: true
})
export class AdminComponent {}
