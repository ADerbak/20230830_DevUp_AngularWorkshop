import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayrollReportComponent } from './payroll-report/payroll-report.component';
import { PayrollScreenComponent } from './payroll-screen.component';
import { PayrollSearchComponent } from './payroll-search/payroll-search.component';

const payrollRoutes: Routes = [
  {
    path: '',
    component: PayrollScreenComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: PayrollSearchComponent },
      { path: 'report', component: PayrollReportComponent }
    ]
  }
];

@NgModule({
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(payrollRoutes),
    PayrollReportComponent,
    PayrollScreenComponent,
    PayrollSearchComponent
  ]
})
export class PayrollModule {}
