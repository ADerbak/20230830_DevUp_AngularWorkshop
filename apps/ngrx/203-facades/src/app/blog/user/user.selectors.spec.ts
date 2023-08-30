import { mockUsers } from './mock.users';
import { selectCurrentUser } from './user.selectors';

describe('User Selectors', () => {
  describe('selectCurrentUser', () => {
    it('should handle a matched id', () => {
      expect(selectCurrentUser.projector(mockUsers, 2)).toBe(
        mockUsers[1]
      );
    });

    it('should handle an unmatched id', () => {
      expect(
        selectCurrentUser.projector(mockUsers, 999)
      ).toBeUndefined();
    });

    it('should handle an undefined', () => {
      expect(
        selectCurrentUser.projector(mockUsers, undefined)
      ).toBeUndefined();
    });
  });
});
