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
  Routes
} from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { reducers, metaReducers } from './app/reducers';
import { UserProfileEffects } from './app/user-profile/user-profile.effects';
import { environment } from './environments/environment';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {
    path: 'employees',
    loadChildren: () =>
      import('./app/employees/employees.module').then(
        m => m.EmployeesModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./app/user-profile/user-profile.module').then(
        m => m.UserProfileModule
      )
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot(reducers, {
        metaReducers,
        runtimeChecks: {
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }),
      EffectsModule.forRoot([UserProfileEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 50,
        logOnly: environment.production
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    )
  ]
}).catch(err => console.error(err));
