import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeLoader } from './employee-loader.service';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: ':employeeId', component: EmployeeDetailComponent }
];

@NgModule({
  declarations: [EmployeeDetailComponent, EmployeeListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatListModule
  ],
  providers: [EmployeeLoader]
})
export class EmployeeModule {}
