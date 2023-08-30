import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay, switchMap } from 'rxjs';

const apiUrl = '/api';

// Or connect to the hosted demo API (works from StackBlitz):
// const apiUrl = 'https://api.angularbootcamp.com';

export interface Employee {
  firstName: string;
  lastName: string;
  hoursWorked: number;
  hourlyWage: number;
}

export interface TableOptions {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  filter: string;
}

// Convert any possible value to 'desc' or 'asc'
function convertToAscOrDesc(dir: unknown) {
  return dir === 'desc' ? 'desc' : 'asc';
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Observable<Employee[]>;
  tableOptions: Observable<TableOptions>;

  constructor(route: ActivatedRoute, http: HttpClient) {
    this.tableOptions = route.queryParamMap.pipe(
      map(params => ({
        sortBy: params.get('sortBy') || '',
        sortDirection: convertToAscOrDesc(
          params.get('sortDirection')
        ),
        filter: params.get('filter') || ''
      }))
    );

    this.employees = this.tableOptions.pipe(
      switchMap(options => {
        const params: { _sort: string; _order: string; q?: string } =
          {
            _sort: options.sortBy,
            _order: options.sortDirection
          };

        if (options.filter) {
          params['q'] = options.filter;
        }

        return http.get<Employee[]>(apiUrl + '/employees', {
          params
        });
      }),
      shareReplay(1)
    );
  }
}
