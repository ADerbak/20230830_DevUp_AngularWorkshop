import { initialState, postFeature } from './post.reducer';

describe('Post Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = postFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
