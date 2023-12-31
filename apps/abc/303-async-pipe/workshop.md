# Workshop for this step

* Import `HttpClientModule` into app.module.ts

* Create a service that uses `HttpClient` to load video data from the API:

```
ng generate service videoData
```

* Inject the service into the DashboardComponent and use it to load the
  video data.

* Use the async pipe to unwrap the data in the observable

* Use the RxJS `map` operator in the video data service to transform
  the video data in some way. For example, you could limit the number of
  videos, convert the video names to uppercase, or add a new property to
  each video object that represents the thumbnail image url.
