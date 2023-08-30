import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee, EmployeesService } from './employees.service';

@Component({
  selector: 'app-root',
  template: `
    <h3>Employees</h3>
    <ng-container *ngIf="employees | async as employeeList">
      <ul>
        <li *ngFor="let e of employeeList">
          {{ e.firstName }} {{ e.lastName }}
        </li>
      </ul>
    </ng-container>
  `,
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe]
})
export class AppComponent {
  employees: Observable<Employee[] | undefined>;

  constructor(es: EmployeesService) {
    this.employees = es.pollEmployees();
  }
}
