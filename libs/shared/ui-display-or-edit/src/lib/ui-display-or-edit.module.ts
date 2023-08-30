import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DisplayOrEditComponent } from './display-or-edit/display-or-edit.component';
import { FocusInputDirective } from './display-or-edit/focus-input.directive';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [DisplayOrEditComponent, FocusInputDirective],
  exports: [DisplayOrEditComponent]
})
export class UIDisplayOrEditModule {}
