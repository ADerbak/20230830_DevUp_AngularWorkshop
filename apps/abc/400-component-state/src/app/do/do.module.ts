import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoComponent } from './do.component';
import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

const doRoutes: Routes = [{ path: '', component: DoComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(doRoutes),
    DoComponent,
    HomeTaskListComponent,
    WorkTaskListComponent
  ]
})
export class DoModule {}
