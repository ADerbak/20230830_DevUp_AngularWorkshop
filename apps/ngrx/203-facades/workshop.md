# Workshop for this step

Our components know that they are interacting with NgRx. We will add
and expand services to hide the implementation details from the
components.

1. Reintroduce UserService. Delegate dispatching `user.actions.ts`
   actions to this service, and move selecting from the `Store` into
   the service.

   When this is done, none of the components should inject the
   `Store`. Use `PostService` and `ConfigService` as examples.
2. Optional: Update tests
