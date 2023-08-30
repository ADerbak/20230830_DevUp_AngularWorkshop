import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  firstName: string;
  lastName: string;
  hoursWorked: number;
  hourlyWage: number;
}

const apiUrl = '/api';
const pageSize = 10;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Observable<Employee[]> | undefined;

  constructor(private http: HttpClient) {}

  loadEmployees(pageIndex: number) {
    const params = {
      _start: pageIndex * pageSize,
      _limit: pageSize
    };

    return this.http.get<Employee[]>(apiUrl + '/employees/', {
      params
    });
  }
}
