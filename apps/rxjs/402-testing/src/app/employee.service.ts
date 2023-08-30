import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';

import { Employee } from './employee';

const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getDelayedList(): Observable<string[]> {
    return this.http.get<Employee[]>(apiUrl + '/employees').pipe(
      delay(2000), // this will force us to test asynchronously
      map(employees => employees.map(e => e.firstName)),
      map(names => names.sort()),
      catchError(err => {
        console.error('handling error within getEmployees()', err);
        const fakeData = ['no employees could be loaded'];
        return of(fakeData);
      })
    );
  }

  getFilteredList(searchText: string): Observable<Employee[]> {
    const params = { q: searchText, _limit: '20' };

    return this.http.get<Employee[]>(apiUrl + '/employees', {
      params
    });
  }
}
