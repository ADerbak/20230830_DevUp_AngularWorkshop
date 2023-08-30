import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PostService } from '../post-list/post.service';
import { Post, User } from '../types';

import { selectCurrentUser } from './user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user$: Observable<User | undefined>;
  posts$: Observable<Post[] | undefined>;

  constructor(store: Store, postService: PostService) {
    this.user$ = store.select(selectCurrentUser);
    this.posts$ = postService.posts;
  }
}
