import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCurrentUserId } from '../../router.selectors';

import { selectCurrentUser, selectUsers } from './user.selectors';

@Injectable({ providedIn: 'root' })
export class UserService {
  users = this.store.select(selectUsers);
  currentUserId = this.store.select(selectCurrentUserId);
  currentUser = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}
}
