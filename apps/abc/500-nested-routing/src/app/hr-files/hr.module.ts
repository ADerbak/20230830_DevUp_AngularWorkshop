import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HrFilesSearchComponent } from './hr-files-search.component';

const hrRoutes: Routes = [
  { path: '', component: HrFilesSearchComponent }
];

@NgModule({
  exports: [HrFilesSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(hrRoutes),
    HrFilesSearchComponent
  ] // import MODULES
  // import MODULES
})
export class HrModule {}
