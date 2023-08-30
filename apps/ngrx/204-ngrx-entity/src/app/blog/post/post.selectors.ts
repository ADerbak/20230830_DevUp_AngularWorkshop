import { createSelector } from '@ngrx/store';

import { selectCurrentPostId } from '../../router.selectors';

import { postFeature, adapter } from './post.reducer';

export const { selectPostState } = postFeature;

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectPosts = createSelector(selectPostState, selectAll);

export const selectPostsByUser = (userId: string | number) =>
  createSelector(selectPosts, posts =>
    posts.filter(post => post.userId === Number(userId))
  );

const selectPostEntities = createSelector(
  selectPostState,
  selectEntities
);

export const selectCurrentPost = createSelector(
  selectPostEntities,
  selectCurrentPostId,
  (entities, postId) =>
    postId ? entities[postId] ?? null : undefined
);
