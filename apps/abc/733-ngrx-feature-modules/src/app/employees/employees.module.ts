import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CurrentEmployeesComponent } from './current-employees/current-employees.component';
import { EmployeeDisplayComponent } from './employee-display/employee-display.component';
import { EmployeesDashboardComponent } from './employees.component';
import { EmployeesEffects } from './employees.effects';
import * as fromEmployees from './employees.reducer';
import { NewEmployeesComponent } from './new-employees/new-employees.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesDashboardComponent,
    children: [
      { path: '', redirectTo: 'current', pathMatch: 'full' },
      { path: 'current', component: CurrentEmployeesComponent },
      { path: 'new', component: NewEmployeesComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromEmployees.employeesFeature),
    EffectsModule.forFeature([EmployeesEffects]),
    CurrentEmployeesComponent,
    EmployeeDisplayComponent,
    EmployeesDashboardComponent,
    NewEmployeesComponent
  ]
})
export class EmployeesModule {}
