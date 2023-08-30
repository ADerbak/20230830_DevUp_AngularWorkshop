# Workshop for this step

With Effects, our Posts are now fully CRUD to the server. We will not
make all of those changes for Users, because Users are read-only, but
we will improve loading the Users and add error handling.

1. We don't need to make any changes to `user.actions.ts` - the
   schematic added all the actions we need in the previous workshop.
2. Uncomment the contents of `UserEffects`. Replace `EMPTY` with a
   call to `UserLoaderService.load()`.
3. In `UserEffects`, add an initialization hook to invoke the
   `loadUsers` action.
4. In `UserEffects`, add a non-dispatching effect to handle the
   errors.
5. Uncomment the reference to `UserEffects` in `BlogModule` and 
   remove the constructor.

## Notes

1. Don't worry about broken tests at this point.
