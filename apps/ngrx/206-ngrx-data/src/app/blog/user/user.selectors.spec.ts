import { Dictionary } from '@ngrx/entity';

import { User } from '../types';

import { mockUsers } from './mock.users';
import { selectCurrentUser } from './user.selectors';

describe('User Selectors', () => {
  describe('selectCurrentUser', () => {
    let entities: Dictionary<User>;

    beforeEach(() => {
      entities = { 1: mockUsers[0], 2: mockUsers[1] };
    });

    it('should handle a matched id', () => {
      expect(selectCurrentUser.projector(entities, 2)).toBe(
        mockUsers[1]
      );
    });

    it('should handle an unmatched id', () => {
      expect(
        selectCurrentUser.projector(entities, 999)
      ).toBeUndefined();
    });

    it('should handle an undefined', () => {
      expect(
        selectCurrentUser.projector(entities, undefined)
      ).toBeUndefined();
    });
  });
});
