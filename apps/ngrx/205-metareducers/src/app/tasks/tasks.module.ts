import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DoneTasksComponent } from './done-tasks/done-tasks.component';
import { TasksDashboardComponent } from './tasks-dashboard/tasks-dashboard.component';
import { TasksEffects } from './tasks.effects';
import * as fromTasks from './tasks.reducer';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoTasksComponent } from './todo-tasks/todo-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TasksDashboardComponent,
    children: [
      { path: '', redirectTo: 'done', pathMatch: 'prefix' },
      { path: 'done', component: DoneTasksComponent },
      { path: 'todo', component: TodoTasksComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DoneTasksComponent,
    TasksDashboardComponent,
    TodoListComponent,
    TodoTasksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatSidenavModule,
    StoreModule.forFeature(fromTasks.tasksFeature),
    EffectsModule.forFeature([TasksEffects])
  ]
})
export class TasksModule {}
