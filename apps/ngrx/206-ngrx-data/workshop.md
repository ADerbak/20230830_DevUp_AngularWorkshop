# Workshop for this step

In this step, we replace our @ngrx/entity implementations with
@ngrx/data for users and posts.

1. Install the dependencies and set up the boilerplate with
`ng add @ngrx/data`.
2. Data will use `api/user` or `api/users` depending on the endpoint.
   Our server accepts only `/api/users`. Copy the
   `PluralHttpUrlGenerator` from this step into your app, along with
   the entire `providers` array from `app.module.ts`.
3. Add User to the EntityMetadataMap in `entity-metadata.ts`.
   You can remove pluralNames, because users and posts both use
   regular pluralization.
4. Create a new UserDataService that extends
   EntityCollectionServiceBase. Add `this.load()` to the constructor.
5. Modify `UserService.users` to use the `entities$` property on the
   new service.
6. Change `UserService.currentUser` to combine the latest of the
   `users` and `currentUserId` Observables.
7. With Data in place,  `user.actions.ts`', `user.effects.ts`,
   `user.reducer.ts`, `user.selectors.ts`, and
   `user-loader.service.ts` are obsolete; remove them (along with
   their tests and other references to them).
