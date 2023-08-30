import { mockUsers } from './mock.users';
import { selectUser } from './user.selectors';

describe('User Selectors', () => {
  describe('selectUser', () => {
    it('should handle a number id', () => {
      expect(selectUser(2).projector(mockUsers)).toBe(mockUsers[1]);
    });

    it('should handle a string id', () => {
      expect(selectUser('2').projector(mockUsers)).toBe(mockUsers[1]);
    });
  });
});
