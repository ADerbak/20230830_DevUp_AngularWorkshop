import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable, switchMap } from 'rxjs';

import { ConfigService } from '../../config.service';
import { postIdQueryParam } from '../../routing-parameters';
import { extractUserId } from '../operators';
import { Post } from '../types';

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
    private postService: PostService,
    route: ActivatedRoute,
    private router: Router,
    configService: ConfigService
  ) {
    this.title = configService.title;

    this.userId = route.paramMap.pipe(extractUserId());

    this.posts = this.userId.pipe(
      switchMap(userId => this.getPostsByUser(userId))
    );

    this.selectedPostId = postService.selectedPostId;
  }

  getPostsByUser(userId: number) {
    return this.postService.getByUser(userId);
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
    this.postService.createPost(newPost);
  }
}
