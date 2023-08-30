import { Component } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { User } from '../types';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  readonly users$: Observable<User[]>;

  constructor(userService: UserService) {
    this.users$ = userService.users.pipe(
      filter(users => !!users.length)
    );
  }
}
