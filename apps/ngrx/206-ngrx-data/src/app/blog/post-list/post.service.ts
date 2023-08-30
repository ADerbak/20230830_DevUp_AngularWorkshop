import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { selectCurrentPostId } from '../../router.selectors';
import { PostDataService } from '../post/post-data.service';
import { Post } from '../types';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts = this.postDataService.entities$;
  currentPostId = this.store.select(selectCurrentPostId);
  // One downside of Data - we lose the selector memoization
  currentPost = combineLatest([
    this.postDataService.entityMap$,
    this.currentPostId
  ]).pipe(
    map(([posts, postId]) =>
      postId ? posts[postId] ?? null : undefined
    )
  );

  constructor(
    private store: Store,
    private postDataService: PostDataService
  ) {}

  getPostsByUser(userId: number) {
    return this.posts.pipe(
      map(posts =>
        posts.filter(post => post.userId === Number(userId))
      )
    );
  }

  createPost(post: Omit<Post, 'id'>) {
    // it's ok to exclude the id with a pessimistic save
    this.postDataService.add(post as Post, { isOptimistic: false });
  }

  deletePost(post: Post) {
    this.postDataService.delete(post);
  }

  updatePost(post: Post) {
    this.postDataService.update(post, { isOptimistic: false });
  }
}
