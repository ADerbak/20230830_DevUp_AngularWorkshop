import { Component, Input } from '@angular/core';

import { Employee } from './employee';
import { EmployeeDisplayComponent } from './employee-display.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  standalone: true,
  imports: [EmployeeDisplayComponent]
})
export class EmployeeDetailComponent {
  @Input() employee: Employee | undefined;
}
