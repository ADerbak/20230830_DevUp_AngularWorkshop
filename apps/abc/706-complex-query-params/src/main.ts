import {
  withInterceptorsFromDi,
  provideHttpClient
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  withHashLocation,
  withInMemoryScrolling,
  provideRouter,
  Routes
} from '@angular/router';

import { AppComponent } from './app/app.component';
import { EmployeeDashboardComponent } from './app/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  { path: '', component: EmployeeDashboardComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ReactiveFormsModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    )
  ]
}).catch(err => console.error(err));
