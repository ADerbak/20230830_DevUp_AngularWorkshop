import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEqual } from 'lodash-es';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  switchMap
} from 'rxjs';

import { postIdQueryParam } from '../../routing-parameters';
import { Post } from '../types';

import { PostLoaderService } from './post-loader.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  private _posts: BehaviorSubject<Post[]> = new BehaviorSubject<
    Post[]
  >([]);

  readonly posts: Observable<Post[]> = this._posts.asObservable();

  readonly selectedPostId: Observable<number | undefined>;

  readonly selectedPost: Observable<Post | undefined>;

  constructor(
    private postLoaderSvc: PostLoaderService,
    route: ActivatedRoute
  ) {
    this.postLoaderSvc
      .load()
      .subscribe(posts => this._posts.next(posts));

    this.selectedPostId = route.queryParamMap.pipe(
      map(params => params.get(postIdQueryParam)),
      distinctUntilChanged(isEqual),
      map(id => (id ? Number(id) : undefined)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.selectedPost = this.selectedPostId.pipe(
      switchMap(postId =>
        postId ? this.getPost(postId) : of(undefined)
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  getByUser(userId: string | number) {
    return this.posts.pipe(
      map(posts =>
        posts.filter(post => post.userId === Number(userId))
      )
    );
  }

  getPost(postId: string | number) {
    return this.posts.pipe(
      map(posts => posts.find(post => post.id === Number(postId)))
    );
  }

  deletePost(post: Post) {
    const posts = this._posts.value.filter(p => p.id !== post.id);
    this._posts.next(posts);
  }

  createPost(post: Omit<Post, 'id'>) {
    let posts = this._posts.value;
    const newId = Math.max(...this._posts.value.map(p => p.id)) + 1;
    posts = [...posts, { ...post, id: newId }];
    this._posts.next(posts);
  }

  updatePost(post: Post) {
    let posts = this._posts.value;
    const index = posts.findIndex(p => p.id === post.id);
    if (index >= 0) {
      posts = [
        ...posts.slice(0, index),
        post,
        ...posts.slice(index + 1, posts.length)
      ];
    }
    this._posts.next(posts);
  }
}
