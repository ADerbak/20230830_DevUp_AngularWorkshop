import { mockUsers } from './mock.users';
import { userApiActions } from './user.actions';
import { initialState, userFeature } from './user.reducer';

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = userFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadUsersSuccess', () => {
    it('should load users', () => {
      const users = mockUsers;
      const result = userFeature.reducer(
        initialState,
        userApiActions.loadUsersSuccess({ users })
      );

      expect(result.users).toEqual(users);
    });
  });
});
