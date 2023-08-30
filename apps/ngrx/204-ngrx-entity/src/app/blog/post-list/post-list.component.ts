import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter, firstValueFrom, Observable, switchMap } from 'rxjs';

import { ConfigService } from '../../config.service';
import { postIdQueryParam } from '../../routing-parameters';
import { postListPageActions } from '../post/post.actions';
import { Post } from '../types';
import { UserService } from '../user/user.service';

import { PostService } from './post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  readonly posts: Observable<Post[]>;
  readonly title: Observable<string>;
  readonly selectedPostId: Observable<number | undefined>;
  readonly userId: Observable<number>;

  constructor(
    private router: Router,
    private postService: PostService,
    userService: UserService,
    configService: ConfigService
  ) {
    this.title = configService.title;

    this.userId = userService.currentUserId.pipe(
      filter((userId): userId is number => !!userId)
    );

    this.posts = this.userId.pipe(
      switchMap(userId => this.getPostsByUser(userId))
    );

    this.selectedPostId = postService.currentPostId;
  }

  getPostsByUser(userId: number) {
    return this.postService.getPostsByUser(userId);
  }

  selectPost(postId: number) {
    const queryParams = { [postIdQueryParam]: postId };
    void this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  async createPost() {
    const uid = await firstValueFrom(this.userId);

    const newPost: Omit<Post, 'id'> = {
      body: 'placeholder body',
      title: 'placeholder title',
      userId: uid || 0
    };
    this.postService.dispatch(
      postListPageActions.createPost({ post: newPost })
    );
  }
}
