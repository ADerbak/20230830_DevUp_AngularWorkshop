import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee, EmployeesService } from './employees.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  employees: Observable<Employee[]>;

  constructor(es: EmployeesService) {
    // this.employees = es.getEmployees();
    // this.employees = es.poll1();
    this.employees = es.poll2();
  }
}
