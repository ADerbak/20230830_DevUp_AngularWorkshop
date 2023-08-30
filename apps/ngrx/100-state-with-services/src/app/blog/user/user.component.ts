import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { extractUserId } from '../operators';
import { PostService } from '../post-list/post.service';
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
    userService: UserService,
    postService: PostService,
    route: ActivatedRoute
  ) {
    this.user$ = route.paramMap.pipe(
      extractUserId(),
      switchMap(id => userService.getUser(id))
    );

    this.posts$ = postService.posts;
  }
}
