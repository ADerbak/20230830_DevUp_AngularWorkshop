import { createSelector } from '@ngrx/store';

import { postFeature } from './post.reducer';

export const { selectPosts, selectCurrentPostId } = postFeature;

export const selectPostsByUser = (userId: string | number) =>
  createSelector(selectPosts, posts =>
    posts.filter(post => post.userId === Number(userId))
  );

export const selectCurrentPost = createSelector(
  selectPosts,
  selectCurrentPostId,
  (posts, postId) => posts.find(post => post.id === postId)
);
