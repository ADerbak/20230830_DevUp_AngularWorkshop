import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';

import { extractUserId } from '../operators';
import { selectPosts } from '../post/post.selectors';
import { Post, User } from '../types';

import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user$: Observable<User | undefined>;
  posts$: Observable<Post[] | undefined>;

  constructor(
    store: Store,
    userService: UserService,
    route: ActivatedRoute
  ) {
    this.user$ = route.paramMap.pipe(
      extractUserId(),
      switchMap(id => userService.getUser(id))
    );

    this.posts$ = store.select(selectPosts);
  }
}
