import {
  withInterceptorsFromDi,
  provideHttpClient
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { AppEffects } from './app/app.effects';
import { HomeTasksEffects } from './app/home-tasks.effects';
import { reducers } from './app/reducers';
import { WorkTasksEffects } from './app/work-tasks.effects';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot(reducers, {
        runtimeChecks: {
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }),
      EffectsModule.forRoot([
        AppEffects,
        HomeTasksEffects,
        WorkTasksEffects
      ]),
      StoreDevtoolsModule.instrument({
        maxAge: 50,
        logOnly: environment.production
      })
    ),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch(err => console.error(err));
