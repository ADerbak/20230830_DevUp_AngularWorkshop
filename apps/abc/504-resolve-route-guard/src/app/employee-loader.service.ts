import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hoursWorked: number;
  hourlyWage: number;
}

const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoaderService {
  constructor(private http: HttpClient) {}

  getList(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(apiUrl + '/employees')
      .pipe(map(longList => longList.slice(0, 9)));
  }

  getDetails(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(
      `${apiUrl}/employees/${employeeId}`
    );
  }
}
