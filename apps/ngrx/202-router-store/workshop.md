# Workshop for this step

The route is the ultimate source of information for the current user
and the selected post. Before this step, we were manually putting both
into NgRx, and current user is still there. We will now use
@ngrx/router-store to manage the interaction between the router and
NgRx.

1. Add `selectCurrentUserId` to `router.selectors.ts`. Note that it'll
   use `selectRouteParam`, not the `selectQueryParam` that the post
   selector uses.
2. Add `selectCurrentUser` as a compound selector to
   `user.selectors.ts`. This replaces the existing `selectUser`
   selector, which you can remove.
3. Change all components that use `ActivatedRoute` or an `@Input()`
   for `userId` to use `selectCurrentUserId` or `selectCurrentUser`
   instead. This will involve `UserListComponent`, `PostListComponent`,
   and `UserComponent`.
4. Optional: Update the tests. The code to mock out `ActivatedRoute`
   can go away.

## Notes

1. The dependencies are already installed, and `AppModule` already
   knows about `RouterStore`, because we ran
   `ng add @ngrx/router-store --project ngrx202-router-store` in the root
   directory to set up posts routing.
