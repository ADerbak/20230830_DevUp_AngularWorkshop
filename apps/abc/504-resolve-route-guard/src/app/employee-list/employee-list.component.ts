import { NgFor, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import {
  Employee,
  EmployeeLoaderService
} from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe]
})
export class EmployeeListComponent {
  list: Observable<Employee[]>;

  constructor(loader: EmployeeLoaderService) {
    this.list = loader.getList();
  }
}
