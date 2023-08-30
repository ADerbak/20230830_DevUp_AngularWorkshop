import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Employee } from '../employee-loader.service';

@Component({
  standalone: true,
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  imports: [AsyncPipe]
})
export class EmployeeDetailsComponent {
  @Input() employee?: Employee;
}
