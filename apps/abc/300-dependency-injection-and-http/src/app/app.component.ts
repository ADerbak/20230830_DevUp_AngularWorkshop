import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const apiUrl = '/api';

// Or connect to the hosted demo API (works from StackBlitz):
// const apiUrl = 'https://api.angularbootcamp.com';

interface Employee {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf, NgFor]
})
export class AppComponent {
  employees: Employee[] = [];
  loading = true;

  constructor(http: HttpClient) {
    http
      .get<Employee[]>(apiUrl + '/employees')
      .subscribe(employees => {
        this.loading = false;
        this.employees = employees;
      });
  }
}
