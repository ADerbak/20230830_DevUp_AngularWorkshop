import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { sortBy } from 'lodash-es';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
  Subject,
  switchMap
} from 'rxjs';

import { Employee } from '../employee';
import { EmployeeLoaderService } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  nameFilter = new FormControl('', { nonNullable: true });
  sort = new FormControl('lastName', { nonNullable: true });

  filteredList: Observable<Employee[]>;
  selectedId = new Subject<number>();
  selectedEmployee: Observable<Employee>;

  constructor(loader: EmployeeLoaderService) {
    // .valueChanges is missing the initial value; add it:
    const nameFilter = this.nameFilter.valueChanges.pipe(
      startWith<string>(this.nameFilter.value as string)
    );

    const sort = this.sort.valueChanges.pipe(
      startWith<string>(this.sort.value as string)
    );

    // List reacts to filter and sort changes
    this.filteredList = combineLatest([
      nameFilter.pipe(
        debounceTime(250),
        switchMap(x => loader.getList(x))
      ),
      sort
    ]).pipe(map(([list, sortKey]) => sortBy(list, sortKey)));

    // Detail reacts to selected employee changes
    this.selectedEmployee = this.selectedId.pipe(
      switchMap(id => loader.getDetails(id))
    );
  }
}
