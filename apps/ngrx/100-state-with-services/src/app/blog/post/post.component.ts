import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, tap } from 'rxjs';

import { postIdQueryParam } from '../../routing-parameters';
import { extractUserId } from '../operators';
import { PostService } from '../post-list/post.service';
import { Post } from '../types';

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
    route: ActivatedRoute,
    router: Router
  ) {
    const userId$ = route.paramMap.pipe(extractUserId());

    this.post$ = combineLatest([
      postService.selectedPost,
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
    // Typically you wouldn't use native browser dialogs
    if (
      window.confirm('Are you sure you want to delete this post?')
    ) {
      this.postService.deletePost(post);
    }
  }

  setTitle(post: Post) {
    this.postService.updatePost({
      ...post,
      title: this.title.value
    });
  }

  setBody(post: Post) {
    this.postService.updatePost({
      ...post,
      body: this.body.value
    });
  }
}
