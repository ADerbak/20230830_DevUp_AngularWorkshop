import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { EmployeeListHeaderComponent } from '../employee-list-header/employee-list-header.component';
import { Employee, TableOptions } from '../employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [NgFor, EmployeeListHeaderComponent, RouterLink]
})
export class EmployeeListComponent {
  @Input() employees: Employee[] = [];
  @Input() options: TableOptions | undefined;

  headers = [
    {
      propertyName: 'firstName',
      display: 'First Name'
    },
    {
      propertyName: 'lastName',
      display: 'Last Name'
    },
    {
      propertyName: 'hoursWorked',
      display: 'Hours Worked'
    },
    {
      propertyName: 'hourlyWage',
      display: 'Hourly Wage'
    }
  ];

  constructor(private router: Router) {}

  headerClicked(sortBy: string) {
    if (this.options?.sortBy === sortBy) {
      this.changeDirection(this.options);
    } else {
      const queryParams = { sortBy, sortDirection: undefined };
      void this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge'
      });
    }
  }

  private changeDirection(options: TableOptions) {
    const sortDirection =
      options.sortDirection === 'asc' ? 'desc' : 'asc';
    const queryParams = { sortDirection };
    void this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
}
