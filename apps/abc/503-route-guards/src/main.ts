import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  withHashLocation,
  withInMemoryScrolling,
  provideRouter,
  Routes
} from '@angular/router';

import { AdminComponent } from './app/admin.component';
import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/auth.guard';
import { BigFormComponent } from './app/big-form.component';
import { ForbiddenComponent } from './app/forbidden.component';
import { FormDeactivateGuard } from './app/form-deactive.guard';
import { HomeComponent } from './app/home.component';
import { NameComponent } from './app/name.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hello', component: NameComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bigform',
    component: BigFormComponent,
    canDeactivate: [FormDeactivateGuard]
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ReactiveFormsModule),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    )
  ]
}).catch(err => console.error(err));
