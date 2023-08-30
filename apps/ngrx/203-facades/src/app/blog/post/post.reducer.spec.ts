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

      expect(result.posts).toEqual(posts);
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

      expect(result.posts.length).toBe(4);
      expect(result.posts[3]).toEqual(newPost);
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

      expect(result.posts.length).toBe(2);
      expect(result.posts).not.toContainEqual(mockPosts[1]);
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

      expect(result.posts.length).toBe(3);
      expect(result.posts[2]).toEqual(newPost);
    });
  });
});
