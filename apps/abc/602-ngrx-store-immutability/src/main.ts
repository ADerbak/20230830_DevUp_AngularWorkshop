import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app/app.component';
import { reducers } from './app/reducers';
import { AppState } from './app/state';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot<AppState>(reducers, {
        runtimeChecks: {
          strictStateSerializability: true,
          strictActionSerializability: true
          // As of NgRx 9 these runtime checks are turned on by default:
          // strictStateImmutability: true,
          // strictActionImmutability: true
        }
      })
    )
  ]
}).catch(err => console.error(err));
