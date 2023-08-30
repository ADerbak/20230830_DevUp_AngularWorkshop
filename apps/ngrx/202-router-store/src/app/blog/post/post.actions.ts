import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Post } from '../types';

export const postInitActions = createActionGroup({
  source: 'Post Init',
  events: {
    'Load Posts': emptyProps()
  }
});

export const postPageActions = createActionGroup({
  source: 'Post Page',
  events: {
    'Delete Post': props<{ post: Post }>(),
    'Update Post': props<{ post: Post }>()
  }
});

export const postListPageActions = createActionGroup({
  source: 'Post List Page',
  events: {
    'Create Post': props<{ post: Omit<Post, 'id'> }>()
  }
});

export const postApiActions = createActionGroup({
  source: 'Post Api',
  events: {
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Failure': props<{ error: unknown }>(),
    'Create Post Success': props<{ post: Post }>(),
    'Create Post Failure': props<{ error: unknown }>(),
    'Delete Post Success': props<{ postId: number }>(),
    'Delete Post Failure': props<{ error: unknown }>(),
    'Update Post Success': props<{ post: Post }>(),
    'Update Post Failure': props<{ error: unknown }>()
  }
});
