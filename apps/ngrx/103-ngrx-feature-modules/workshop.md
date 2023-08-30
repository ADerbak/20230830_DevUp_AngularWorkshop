# Workshop for this step

In this step, we've seen what a basic use of @ngrx/store looks like
for posts. We will add the same for users. We will need to add
actions, reducers, and selectors.

This is a big workshop, and it involves adding the core of NgRx to an
application. Your instructor may break this up into multiple
workshops.

1. Add a Feature for the Users by entering this in
  `apps/ngrx/ngrx103-ngrx-feature-modules/src/app`:
  `npx nx g @ngrx/schematics:feature blog/user/User --module blog/blog.module.ts`.
   Answer Yes for the first question and accept the default for the 
   second. This will create the files you will need for this and later
   workshops.
2. Comment out all the contents of `UserEffects` in
   `user.effects.ts`; we will use this file in a later workshop. Also
   comment out the references to `UserEffects` in `BlogModule`.
3. Change the payload of the `loadUsersSuccess` action to be an array
   of Users called `users`.
4. Add the state and implement the reducer for `loadUsersSuccess` and
   remove the reducers for `loadUsers` and `loadUserFailure`.
5. Update `BlogModule` to register your reducer, if necessary.
6. Add a selector called `selectUsers` to `user.selectors.ts` to return
   all the users, and use this new selector in `UserListComponent`
   instead of using `UserService`.
7. Add a selector called `selectUser` to `user.selectors.ts` to return
   a single user when given an id, and use this new selector in
   `UserComponent` instead of using `UserService`.
8. Nothing should be using `UserService` now, so remove it.
9. Update `BlogModule` to load the users from `UserLoaderService`
   and dispatch `loadUsersSuccess` with the result (similar to how
   Posts are loaded).

   Note that this approach is not good practice; we will see the
   correct approach with Effects.

## Notes

1. Don't worry about broken tests at this point.
2. We have the dependencies in the abc.zip file already set up, but if
   you were doing this on a new app, you would have to add the
   appropriate ngrx dependencies for schematics. The easiest way is this CLI
   command:
   `npm install @ngrx/schematics --save-dev`.
3. If you have time, try moving the `selectedUserId` into the store
   (similar to the `selectedPostId` being in the store). Here are the
   steps:
   1. Add `currentUserId` to the state that is managed for users (this
      means State will change, and you'll need a new reducer function,
      a new selector, and a new action with the shape
      `{userId: number}`).
   2. Add a compound selector called `selectCurrentUser` that takes the
      results of `selectUsers` and `selectCurrentUserId` to retrieve the
      selected User object. Use this
      selector in `UserComponent` instead of using the router and a
      `switchMap` on a `UserService` call.
   3. Change `PostComponent` and `PostListComponent` to get the current
      userId from store instead of from the router or the parent.
