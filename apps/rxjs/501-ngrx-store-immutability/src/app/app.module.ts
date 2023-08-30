import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

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
    StoreModule.forRoot<AppState>(reducers, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true

        // As of NgRx 9 these runtime checks are turned on by default:
        // strictStateImmutability: true,
        // strictActionImmutability: true
      }
    }),
    HeaderModule,
    MatButtonModule,
    MatListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
