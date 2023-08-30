import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

import { EmployeeComponent } from './employee.component';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.scss'],
  standalone: true,
  imports: [NgFor]
})
export class EmployeeGridComponent extends EmployeeComponent {}
