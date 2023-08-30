import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';

import { UserLoaderService } from './user-loader.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly users = this.userLoaderService.load().pipe(shareReplay(1));

  constructor(private userLoaderService: UserLoaderService) {}

  getUser(id: string | number) {
    return this.users.pipe(
      map(users => users.find(user => user.id === +id))
    );
  }
}
