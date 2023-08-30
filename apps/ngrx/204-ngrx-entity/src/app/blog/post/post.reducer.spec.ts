import { mockPosts } from './mock.posts';
import { postApiActions } from './post.actions';
import { initialState, postFeature } from './post.reducer';

describe('Post Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = postFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadPostsSuccess', () => {
    it('should load posts', () => {
      const posts = mockPosts;
      const result = postFeature.reducer(
        initialState,
        postApiActions.loadPostsSuccess({ posts })
      );

      expect(result.ids).toEqual([1, 2, 3]);
      expect(result.entities).toEqual({
        1: mockPosts[0],
        2: mockPosts[1],
        3: mockPosts[2]
      });
    });
  });

  describe('createPostSuccess', () => {
    it('should create a post', () => {
      const newPost = {
        userId: 3,
        id: 4,
        title: 'titleNew',
        body: 'bodyNew'
      };

      const result = [
        postApiActions.loadPostsSuccess({ posts: mockPosts }),
        postApiActions.createPostSuccess({
          post: newPost
        })
      ].reduce(postFeature.reducer, initialState);

      expect(result.ids).toEqual([1, 2, 3, 4]);
      expect(result.entities).toEqual({
        1: mockPosts[0],
        2: mockPosts[1],
        3: mockPosts[2],
        4: newPost
      });
    });
  });

  describe('deletePostSuccess', () => {
    it('should delete a post', () => {
      const result = [
        postApiActions.loadPostsSuccess({ posts: mockPosts }),
        postApiActions.deletePostSuccess({
          postId: 2
        })
      ].reduce(postFeature.reducer, initialState);

      expect(result.ids).toEqual([1, 3]);
      expect(result.entities).toEqual({
        1: mockPosts[0],
        3: mockPosts[2]
      });
    });
  });

  describe('updatePostSuccess', () => {
    it('should update a post', () => {
      const newPost = { ...mockPosts[2], title: 'changedTitle' };
      const result = [
        postApiActions.loadPostsSuccess({ posts: mockPosts }),
        postApiActions.updatePostSuccess({
          post: newPost
        })
      ].reduce(postFeature.reducer, initialState);

      expect(result.ids).toEqual([1, 2, 3]);
      expect(result.entities).toEqual({
        1: mockPosts[0],
        2: mockPosts[1],
        3: {
          userId: 2,
          id: 3,
          title: 'changedTitle',
          body: 'body3'
        }
      });
    });
  });
});
