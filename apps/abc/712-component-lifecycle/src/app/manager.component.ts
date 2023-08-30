import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

import { WorkerComponent } from './worker.component';

@Component({
  selector: 'app-manager-cmp',
  templateUrl: './manager.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, WorkerComponent]
})
export class ManagerComponent {
  testGroup: FormGroup<{
    showing: FormControl<boolean>;
    testVal: FormControl<string>;
    testVal2: FormControl<string>;
    testVal3: FormControl<string>;
  }>;

  constructor(fb: NonNullableFormBuilder) {
    this.testGroup = fb.group({
      showing: [false],
      testVal: [''],
      testVal2: [''],
      testVal3: ['']
    });
  }
}
