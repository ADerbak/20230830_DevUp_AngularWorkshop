import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { tap } from 'rxjs';

import { EmployeeComparisonComponent } from '../employee-comparison/employee-comparison.component';
import { EmployeeExplorerComponent } from '../employee-explorer/employee-explorer.component';
import { Employee, EmployeeLoader } from '../employee-loader.service';

@Component({
  selector: 'app-individual-comparator',
  templateUrl: './individual-comparator.component.html',
  standalone: true,
  imports: [
    EmployeeComparisonComponent,
    EmployeeExplorerComponent,
    AsyncPipe
  ]
})
export class IndividualComparatorComponent {
  employeeList = this.el.getAllEmployees().pipe(
    tap(list => {
      this.comparedEmployees = [list[0], list[1]];
    })
  );

  comparedEmployees: Employee[] = [];

  constructor(private el: EmployeeLoader) {}

  updateComparison(emp: Employee) {
    this.comparedEmployees = [this.comparedEmployees[0], emp];
  }

  reverseComparison() {
    this.comparedEmployees = [
      this.comparedEmployees[1],
      this.comparedEmployees[0]
    ];
  }
}
