import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
// import { FormControl } from '@angular/forms';

import { EmployeeDisplayComponent } from '../employee-display/employee-display.component';
import { Employee } from '../employee-loader.service';

@Component({
  selector: 'app-employee-explorer',
  templateUrl: './employee-explorer.component.html',
  styleUrls: ['./employee-explorer.component.scss'],
  standalone: true,
  imports: [NgFor, EmployeeDisplayComponent]
})
export class EmployeeExplorerComponent {
  @Input() title = 'Employees'; // Provide a default value if the user of this component doesn't
  @Input() employees: Employee[] = [];
  @Input() selectedEmployees: Employee[] = [];
  @Output() employeeClicked = new EventEmitter<Employee>();
  // Implementing a new feature in this view component improves everywhere that it is used
  // In this case, all three lists of employees are made searchable by adding this feature
  // Make sure to update the employee-explorer.component.html as well to see it in action
  // filter = new FormControl('');

  employeeIsSelected(emp: Employee) {
    return this.selectedEmployees.find(e => e.id === emp.id);
  }

  // filteredList() {
  //   if (!this.employees) {
  //     return [];
  //   }
  //   return this.employees.filter(e =>
  //     e.firstName.toLowerCase().includes(this.filter.value.toLowerCase()) ||
  //     e.lastName.toLowerCase().includes(this.filter.value.toLowerCase()));
  // }
}
