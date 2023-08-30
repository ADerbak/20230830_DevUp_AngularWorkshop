import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';

import { extractUserId } from '../operators';
import { selectPosts } from '../post/post.selectors';
import { Post, User } from '../types';

import { selectUser } from './user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user$: Observable<User | undefined>;
  posts$: Observable<Post[] | undefined>;

  constructor(store: Store, route: ActivatedRoute) {
    this.user$ = route.paramMap.pipe(
      extractUserId(),
      switchMap(id => store.select(selectUser(id)))
    );

    this.posts$ = store.select(selectPosts);
  }
}
