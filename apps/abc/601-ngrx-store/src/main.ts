import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app/app.component';
import { AppState, reducers } from './app/state';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(StoreModule.forRoot<AppState>(reducers))
  ]
}).catch(err => console.error(err));
