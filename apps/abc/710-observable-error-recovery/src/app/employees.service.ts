import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, switchMap, tap } from 'rxjs';

const apiUrl = '/api';
const url = apiUrl + '/employees';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hoursWorked: number;
  hourlyWage: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  // Where should the catchError be placed to recover gracefully?

  fetchEmployees() {
    return this.http.get<Employee[]>(url).pipe(
      tap(employees => console.table(employees))
      // catchError(() => of(undefined))
    );
  }

  pollEmployees(): Observable<Employee[] | undefined> {
    return interval(2000).pipe(
      switchMap(() => this.fetchEmployees())
      // catchError(() => of(undefined))
    );
  }
}
