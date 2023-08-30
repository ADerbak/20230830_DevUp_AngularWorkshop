import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withRouterConfig } from '@angular/router';

import { AppComponent } from './app/app.component';
import { config, routes } from './app/app.routes';

void bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withRouterConfig(config))]
});
