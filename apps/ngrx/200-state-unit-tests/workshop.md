# Workshop for this step

There's full testing in place for the NgRx implementation of Posts,
and you will add testing for Users. Use `mock.users.ts` to help your
tests.

1. Run `npm run test ngrx200` to execute the tests. The Posts
   tests run fine, but the User tests are commented out.
2. Add testing for `user.reducer.ts`.
3. Add testing for `user.effects.ts`.
4. Add testing for `user.selectors.ts` (`selectUser` is the only
   testable selector - test its projector function).
