import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Employee } from './interfaces';

@Component({
  selector: 'app-employee-base',
  template: '',
  standalone: true
})
export class EmployeeComponent {
  @Input() employees: Employee[] = [];
  @Output() selectEmp = new EventEmitter();

  heading = 'Employees';

  selectEmployee(employee: Employee) {
    this.selectEmp.emit(employee);
  }
}
