import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Post } from '../types';

export const postActions = createActionGroup({
  source: 'Post',
  events: {
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Failure': props<{ error: unknown }>(),
    'Create Post': props<{ post: Omit<Post, 'id'> }>(),
    'Delete Post': props<{ post: Post }>(),
    'Update Post': props<{ post: Post }>(),
    'Choose Post': props<{ postId: number | undefined }>()
  }
});
