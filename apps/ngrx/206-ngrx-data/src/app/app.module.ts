import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DefaultDataServiceConfig,
  EntityDataModule,
  HttpUrlGenerator
} from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { UIDisplayOrEditModule } from '@class-materials/shared/ui-display-or-edit';
import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { entityConfig } from './entity-metadata';
import { PluralHttpUrlGenerator } from './plural-http-url-generator';
import { AppState, metaReducers, reducers } from './reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HeaderModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    UIDisplayOrEditModule,
    StoreModule.forRoot<AppState>(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot(),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    // Our server serves users at /api/users for all calls,
    // but Data assumes some calls will be at api/user. The
    // generator tells Data to use plural always.
    { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator },
    // The default root is 'api', but we need '/api'
    {
      provide: DefaultDataServiceConfig,
      useValue: {
        root: '/api'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
