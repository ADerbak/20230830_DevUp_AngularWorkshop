import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeViewerComponent } from './employees-viewer/employee-viewer.component';

const routes: Routes = [
  { path: '', component: EmployeeViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
