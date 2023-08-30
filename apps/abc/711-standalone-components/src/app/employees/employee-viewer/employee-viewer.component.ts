import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, share, switchMap } from 'rxjs';

import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Employee, EmployeeLoader } from '../employee-loader.service';

@Component({
  standalone: true,
  selector: 'app-employee-viewer',
  templateUrl: './employee-viewer.component.html',
  imports: [AsyncPipe, EmployeeDetailsComponent, RouterLink]
})
export default class EmployeeViewerComponent {
  employee: Observable<Employee>;

  constructor(route: ActivatedRoute, loader: EmployeeLoader) {
    this.employee = route.paramMap.pipe(
      map(paramMap => paramMap.get('employeeId') as string),
      switchMap(id => loader.getDetails(id)),
      share()
    );
  }
}
