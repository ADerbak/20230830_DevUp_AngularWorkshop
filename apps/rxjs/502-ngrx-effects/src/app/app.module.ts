import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { HomeTasksEffects } from './home-tasks.effects';
import { HomeTaskListComponent } from './notification-manager/home-task-list/home-task-list.component';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';
import { WorkTaskListComponent } from './notification-manager/work-task-list/work-task-list.component';
import { reducers } from './reducers';
import { WorkTasksEffects } from './work-tasks.effects';

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
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true

        // As of NgRx 9 these runtime checks are turned on by default:
        // strictStateImmutability: true,
        // strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([
      AppEffects,
      HomeTasksEffects,
      WorkTasksEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    HttpClientModule,
    MatButtonModule,
    MatListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
