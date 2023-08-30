import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { Employee, EmployeeLoader } from '../employee-loader.service';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [RouterLink, NgFor, AsyncPipe]
})
export default class EmployeeListComponent {
  list: Observable<Employee[]>;

  constructor(loader: EmployeeLoader) {
    this.list = loader.getList();
  }
}
