import { initialState, userFeature } from './user.reducer';

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = userFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
