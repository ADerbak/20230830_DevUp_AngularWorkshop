import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Post } from '../types';

import { postApiActions } from './post.actions';

// Note: this is the alternate syntax that can be extended with other
// properties
// export interface State extends EntityState<Post> {}
export type State = EntityState<Post>;

export const adapter: EntityAdapter<Post> =
  createEntityAdapter<Post>();

export const initialState: State = adapter.getInitialState({});

export const postFeature = createFeature({
  name: 'post',
  reducer: createReducer(
    initialState,

    on(postApiActions.loadPostsSuccess, (state, action) =>
      adapter.setAll(action.posts, state)
    ),
    on(postApiActions.createPostSuccess, (state, action) =>
      adapter.addOne(action.post, state)
    ),
    on(postApiActions.deletePostSuccess, (state, action) =>
      adapter.removeOne(action.postId, state)
    ),
    // Note: if we weren't sending this to the server, we could
    // use the Update<Post> type, which is smaller
    on(postApiActions.updatePostSuccess, (state, { post }) =>
      adapter.updateOne({ id: post.id, changes: post }, state)
    )
  )
});
