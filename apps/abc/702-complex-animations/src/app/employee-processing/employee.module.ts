import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './employee.component';

const employeeRoutes: Routes = [
  { path: '', component: EmployeeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(employeeRoutes),
    EmployeeComponent
  ]
})
export class EmployeeModule {}
