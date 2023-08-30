import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeTaskListComponent } from './notification-manager/home-task-list/home-task-list.component';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';
import { WorkTaskListComponent } from './notification-manager/work-task-list/work-task-list.component';
import { reducers } from './reducers';
import { AppState } from './state';

@NgModule({
  declarations: [
    AppComponent,
    HomeTaskListComponent,
    NotificationManagerComponent,
    WorkTaskListComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    StoreModule.forRoot<AppState>(reducers, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true

        // As of NgRx 9 these runtime checks are turned on by default:
        // strictStateImmutability: true,
        // strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
