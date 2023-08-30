import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SiliconWafersComponent } from './silicon-wafers.component';

const cmsRoutes: Routes = [
  { path: '', component: SiliconWafersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(cmsRoutes),
    ReactiveFormsModule,
    SiliconWafersComponent
  ]
})
export class SiliconWafersModule {}
