import { createFeature, createReducer, on } from '@ngrx/store';

import { Post } from '../types';

import { postApiActions, postListPageActions } from './post.actions';

export interface State {
  posts: Post[];
  currentPostId: number | undefined;
}

export const initialState: State = {
  posts: [],
  currentPostId: undefined
};

export const postFeature = createFeature({
  name: 'post',
  reducer: createReducer(
    initialState,

    on(postApiActions.loadPostsSuccess, (state, action) => ({
      ...state,
      posts: [...action.posts]
    })),
    on(postApiActions.createPostSuccess, (state, action) => ({
      ...state,
      posts: [...state.posts, action.post]
    })),
    on(postApiActions.deletePostSuccess, (state, action) => ({
      ...state,
      posts: state.posts.filter(post => post.id !== action.postId)
    })),
    on(postApiActions.updatePostSuccess, (state, action) => {
      const index = state.posts.findIndex(
        post => post.id === action.post.id
      );
      if (index >= 0) {
        return {
          ...state,
          posts: [
            ...state.posts.slice(0, index),
            action.post,
            ...state.posts.slice(index + 1, state.posts.length)
          ]
        };
      } else {
        return state;
      }
    }),
    on(postListPageActions.choosePost, (state, action) => ({
      ...state,
      currentPostId: action.postId
    }))
  )
});
