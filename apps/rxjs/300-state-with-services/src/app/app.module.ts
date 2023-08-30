import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppComponent } from './app.component';
import { HomeTaskListComponent } from './notification-manager/home-task-list/home-task-list.component';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';
import { WorkTaskListComponent } from './notification-manager/work-task-list/work-task-list.component';

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
    MatListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
