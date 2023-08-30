import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';

import { selectCurrentUserId } from '../../router.selectors';
import { postIdQueryParam } from '../../routing-parameters';
import { PostService } from '../post-list/post.service';
import { Post } from '../types';

import { postPageActions } from './post.actions';

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
    private postService: PostService,
    store: Store,
    router: Router
  ) {
    this.post$ = combineLatest([
      postService.currentPost,
      store
        .select(selectCurrentUserId)
        .pipe(filter((userId): userId is number => !!userId))
    ]).pipe(
      tap(([post, userId]) => {
        if (
          // undefined means no query param, which is valid
          post !== undefined &&
          // null means invalid query param
          // userIds not matching means inconsistent state
          // in either case, clear the query param
          (post === null || userId !== post.userId)
        ) {
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
    this.postService.dispatch(postPageActions.deletePost({ post }));
  }

  setTitle(post: Post) {
    this.postService.dispatch(
      postPageActions.updatePost({
        post: {
          ...post,
          title: this.title.value
        }
      })
    );
  }

  setBody(post: Post) {
    this.postService.dispatch(
      postPageActions.updatePost({
        post: {
          ...post,
          body: this.body.value
        }
      })
    );
  }
}
