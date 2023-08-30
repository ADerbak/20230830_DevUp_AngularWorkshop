import { createSelector } from '@ngrx/store';

import { selectCurrentPostId } from '../../router.selectors';

import { postFeature } from './post.reducer';

export const { selectPosts } = postFeature;

export const selectPostsByUser = (userId: string | number) =>
  createSelector(selectPosts, posts =>
    posts.filter(post => post.userId === Number(userId))
  );

export const selectCurrentPost = createSelector(
  selectPosts,
  selectCurrentPostId,
  (posts, postId) =>
    !postId
      ? undefined // no query param for post
      : // return null if we cannot find post
        posts.find(post => post.id === postId) ?? null
);
