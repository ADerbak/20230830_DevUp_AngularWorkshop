import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Employee } from '../employee';

export const employeeIdQueryParam = 'employeeId';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink]
})
export class EmployeeListComponent {
  @Input() list: Employee[] = [];
  @Input() selectedId?: number;

  queryParamKey = employeeIdQueryParam;
}
