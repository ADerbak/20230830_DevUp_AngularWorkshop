# Workshop for this step

Goals:

* Add a new lazy loaded feature module.
* Add several new components to the module.

-----

1. Use the Angular CLI to create the dashboard module.
   The command below will generate the dashboard module as a lazy loaded
   feature module in the `app.module` for the route path of `'dashboard'`.

```
ng generate module dashboard --routing --module app.module --route dashboard
```

(On StackBlitz, right-click the app folder and choose to generate a
new module. Enter "dashboard" at the prompt.)

2. Generate all the nested components to put inside the dashboard.
Add the 'dashboard/' prefix, so they are added to the dashboard module.

For example, your commands may look something like this:

```
ng generate component dashboard/videoList
ng generate component dashboard/videoPlayer
ng generate component dashboard/statFilters
```

(The stat graphs component will be added later, time permitting.)

(On StackBlitz, right-click the dashboard folder and choose to
generate each new component. Enter "videoList" or
"video-list" at the prompt.)

3. Assemble your static application.

Use the components you generated in step 2 to reconstruct the video
stat tracker app in the dashboard component. As you begin, of course,
the components will be placeholders without actual functionality.
