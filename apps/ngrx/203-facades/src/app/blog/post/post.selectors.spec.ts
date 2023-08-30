import { mockPosts } from './mock.posts';
import {
  selectCurrentPost,
  selectPostsByUser
} from './post.selectors';

describe('Post Selectors', () => {
  describe('selectPostsByUser', () => {
    it('should handle a string id', () => {
      expect(selectPostsByUser('1').projector(mockPosts)).toEqual([
        mockPosts[0],
        mockPosts[1]
      ]);
    });

    it('should handle a number id', () => {
      expect(selectPostsByUser(1).projector(mockPosts)).toEqual([
        mockPosts[0],
        mockPosts[1]
      ]);
    });
  });

  describe('selectCurrentPost', () => {
    it('should handle a matching id', () => {
      expect(selectCurrentPost.projector(mockPosts, 2)).toBe(
        mockPosts[1]
      );
    });

    it('should handle a non-matching id', () => {
      expect(selectCurrentPost.projector(mockPosts, 999)).toBeNull();
    });

    it('should handle no id', () => {
      expect(
        selectCurrentPost.projector(mockPosts, undefined)
      ).toBeUndefined();
    });
  });
});
