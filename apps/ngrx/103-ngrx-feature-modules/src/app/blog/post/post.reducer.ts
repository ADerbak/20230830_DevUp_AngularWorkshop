import { createFeature, createReducer, on } from '@ngrx/store';

import { Post } from '../types';

import { postActions } from './post.actions';

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

    on(postActions.loadPostsSuccess, (state, action) => ({
      ...state,
      posts: [...action.posts]
    })),
    on(postActions.createPost, (state, action) => ({
      ...state,
      posts: [
        ...state.posts,
        {
          ...action.post,
          // todo: with Effects, we'll be able to get the new id from
          //  the server
          id: Math.max(...state.posts.map(post => post.id)) + 1
        }
      ]
    })),
    on(postActions.deletePost, (state, action) => ({
      ...state,
      posts: state.posts.filter(post => post.id !== action.post.id)
    })),
    on(postActions.updatePost, (state, action) => {
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
    on(postActions.choosePost, (state, action) => ({
      ...state,
      currentPostId: action.postId
    }))
  )
});
