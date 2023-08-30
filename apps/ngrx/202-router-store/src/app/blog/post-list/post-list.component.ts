import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, switchMap } from 'rxjs';

import { selectTitle } from '../../reducers';
import { selectCurrentPostId } from '../../router.selectors';
import { postIdQueryParam } from '../../routing-parameters';
import { extractUserId } from '../operators';
import { postListPageActions } from '../post/post.actions';
import { selectPostsByUser } from '../post/post.selectors';
import { Post } from '../types';

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
    route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.title = store.select(selectTitle);

    this.userId = route.paramMap.pipe(extractUserId());

    this.posts = this.userId.pipe(
      switchMap(userId => this.getPostsByUser(userId))
    );

    this.selectedPostId = store.select(selectCurrentPostId);
  }

  getPostsByUser(userId: number) {
    return this.store.select(selectPostsByUser(userId));
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
    this.store.dispatch(
      postListPageActions.createPost({ post: newPost })
    );
  }
}
