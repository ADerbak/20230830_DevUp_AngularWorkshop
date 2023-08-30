import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Employee } from './employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  standalone: true,
  imports: [NgFor]
})
export class EmployeeListComponent {
  @Input() employees: Employee[] = [];
  @Output() selectedEmployee = new EventEmitter<number>();
}
