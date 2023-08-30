import { postInitActions } from './post.actions';

describe('loadPosts', () => {
  it('should return an action', () => {
    expect(postInitActions.loadPosts().type).toBe(
      '[Post Init] Load Posts'
    );
  });
});
