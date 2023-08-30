import { userInitActions } from './user.actions';

describe('loadUsers', () => {
  it('should return an action', () => {
    expect(userInitActions.loadUsers().type).toBe(
      '[User Init] Load Users'
    );
  });
});
