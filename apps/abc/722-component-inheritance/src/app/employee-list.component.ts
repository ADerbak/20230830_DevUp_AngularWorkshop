import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

import { EmployeeComponent } from './employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  standalone: true,
  imports: [NgFor]
})
export class EmployeeListComponent extends EmployeeComponent {
  override heading = 'Employee List';
}
