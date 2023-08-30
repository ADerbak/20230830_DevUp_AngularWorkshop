import { NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';

import { Employee } from '../employee-loader.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe]
})
export class EmployeeDetailComponent {
  employee: Observable<Employee>;

  constructor(route: ActivatedRoute) {
    // String here has to match the string in the resolve config of your route
    this.employee = route.data.pipe(
      map(routeData => routeData['employee'])
    );
  }
}
