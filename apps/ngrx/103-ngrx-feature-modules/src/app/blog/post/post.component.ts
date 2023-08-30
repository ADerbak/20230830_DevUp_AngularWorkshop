import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, tap } from 'rxjs';

import { postIdQueryParam } from '../../routing-parameters';
import { extractUserId } from '../operators';
import { Post } from '../types';

import { postActions } from './post.actions';
import { selectCurrentPost } from './post.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  post$: Observable<Post | undefined>;
  title = new FormControl();
  body = new FormControl();

  constructor(
    private store: Store,
    router: Router,
    route: ActivatedRoute
  ) {
    const userId$ = route.paramMap.pipe(extractUserId());

    this.post$ = combineLatest([
      this.store.select(selectCurrentPost),
      userId$
    ]).pipe(
      tap(([post, userId]) => {
        if (!post || userId !== post.userId) {
          void router.navigate([], {
            queryParams: { [postIdQueryParam]: undefined },
            queryParamsHandling: 'merge'
          });
        }
      }),
      map(([post, userId]) =>
        // discard the post if the post is from the wrong user
        userId === post?.userId ? post : undefined
      ),
      tap(post => {
        if (post) {
          this.title.setValue(post.title);
          this.body.setValue(post.body);
        }
      })
    );
  }

  delete(post: Post) {
    if (
      window.confirm('Are you sure you want to delete this post?')
    ) {
      this.store.dispatch(postActions.deletePost({ post }));
    }
  }

  setTitle(post: Post) {
    this.store.dispatch(
      postActions.updatePost({
        post: {
          ...post,
          title: this.title.value
        }
      })
    );
  }

  setBody(post: Post) {
    this.store.dispatch(
      postActions.updatePost({
        post: {
          ...post,
          body: this.body.value
        }
      })
    );
  }
}
