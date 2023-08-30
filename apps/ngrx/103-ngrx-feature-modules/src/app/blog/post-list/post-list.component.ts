import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isEqual } from 'lodash-es';
import {
  distinctUntilChanged,
  firstValueFrom,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap
} from 'rxjs';

import { selectTitle } from '../../reducers';
import { postIdQueryParam } from '../../routing-parameters';
import { extractUserId } from '../operators';
import { postActions } from '../post/post.actions';
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
    // This line was the solution for workshop 101, before we learned
    // about memoized selectors in 102.
    // this.title = store.select(state => state.title);
    this.title = store.select(selectTitle);

    this.userId = route.paramMap.pipe(extractUserId());

    this.posts = this.userId.pipe(
      switchMap(userId => this.getPostsByUser(userId))
    );

    this.selectedPostId = route.queryParamMap.pipe(
      map(params => params.get(postIdQueryParam)),
      distinctUntilChanged(isEqual),
      map(postId => (postId ? Number(postId) : undefined)),
      tap(postId =>
        this.store.dispatch(postActions.choosePost({ postId }))
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
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
    this.store.dispatch(postActions.createPost({ post: newPost }));
  }
}
