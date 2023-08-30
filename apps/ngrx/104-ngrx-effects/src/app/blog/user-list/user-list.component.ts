import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';

import { User } from '../types';
import { selectUsers } from '../user/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  readonly users$: Observable<User[]>;

  constructor(store: Store) {
    this.users$ = store
      .select(selectUsers)
      .pipe(filter(users => !!users.length));
  }
}
