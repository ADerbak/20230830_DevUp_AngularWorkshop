import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Employee } from './employee';

@Component({
  selector: 'app-employee-display',
  templateUrl: './employee-display.component.html',
  standalone: true,
  imports: [NgIf]
})
export class EmployeeDisplayComponent {
  @Input() employee: Employee | undefined;
}
