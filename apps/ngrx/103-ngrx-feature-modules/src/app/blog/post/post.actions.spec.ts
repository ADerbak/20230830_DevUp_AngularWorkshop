import { postActions } from './post.actions';

describe('loadPosts', () => {
  it('should return an action', () => {
    expect(postActions.loadPosts().type).toBe('[Post] Load Posts');
  });
});
