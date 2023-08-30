import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { selectCurrentPostId } from '../../router.selectors';
import {
  selectCurrentPost,
  selectPosts,
  selectPostsByUser
} from '../post/post.selectors';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts = this.store.select(selectPosts);
  currentPost = this.store.select(selectCurrentPost);
  currentPostId = this.store.select(selectCurrentPostId);

  constructor(private store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  getPostsByUser(userId: number) {
    return this.store.select(selectPostsByUser(userId));
  }
}
