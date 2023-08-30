import {
  withInterceptorsFromDi,
  provideHttpClient
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  withHashLocation,
  withInMemoryScrolling,
  provideRouter,
  Route
} from '@angular/router';

import { AppComponent } from './app/app.component';
import { DashboardModule } from './app/dashboard/dashboard.module';

const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(DashboardModule),
    provideRouter(
      ROUTES,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch(err => console.error(err));
