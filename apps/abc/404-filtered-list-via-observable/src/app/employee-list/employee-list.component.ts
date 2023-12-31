import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { sortBy } from 'lodash-es';
import {
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  map,
  startWith,
  switchMap
} from 'rxjs';

import { Employee } from '../employee';
import { EmployeeDetailComponent } from '../employee-detail-view/employee-detail-view.component';
import { EmployeeListTableViewComponent } from '../employee-list-table-view/employee-list-table-view.component';
import { EmployeeLoaderService } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    EmployeeListTableViewComponent,
    EmployeeDetailComponent,
    AsyncPipe
  ]
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
      startWith(this.nameFilter.value)
    );

    const sort = this.sort.valueChanges.pipe(
      startWith(this.sort.value)
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
