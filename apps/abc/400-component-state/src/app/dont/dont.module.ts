import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DontComponent } from './dont.component';
import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

const dontRoutes: Routes = [{ path: '', component: DontComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dontRoutes),
    DontComponent,
    HomeTaskListComponent,
    WorkTaskListComponent
  ]
})
export class DontModule {}
