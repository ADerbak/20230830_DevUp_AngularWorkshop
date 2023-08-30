import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CmsFluidComponent } from './fluid-cms.component';

const cmsRoutes: Routes = [
  { path: '', component: CmsFluidComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(cmsRoutes),
    ReactiveFormsModule,
    CmsFluidComponent
  ]
})
export class CmsFluidModule {}
