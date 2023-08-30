import { NgIf, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor]
})
export class FormSelectComponent {
  @Input() control?: FormControl;
  @Input() label = '';
  @Input() options: string[] = [];
}
