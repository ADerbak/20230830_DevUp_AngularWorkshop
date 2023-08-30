import { Component } from '@angular/core';

import { HrFilesSearchComponent } from './hr-files/hr-files-search.component';
import { PayrollSearchComponent } from './payroll/payroll-search.component';

@Component({
  selector: 'app-root',
  template: `
    <app-payroll-search></app-payroll-search>
    <app-hr-files-search></app-hr-files-search>
  `,
  standalone: true,
  imports: [PayrollSearchComponent, HrFilesSearchComponent]
})
export class AppComponent {}
