import { Component } from '@angular/core';

import { SearchBoxComponent } from '../search/search-box.component';

@Component({
  selector: 'app-payroll-search',
  template: `
    <article>
      <header>Payroll Functionality</header>
      <p>Search for Employee Payroll Records</p>
      <app-search-box></app-search-box>
    </article>
  `,
  standalone: true,
  imports: [SearchBoxComponent]
})
export class PayrollSearchComponent {}
