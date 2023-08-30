import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AppComponent {
  name: FormControl;
  outputValue = '';

  constructor() {
    this.name = new FormControl('', Validators.required);
  }

  setValue() {
    this.name.setValue('Set from code');
  }

  useValue() {
    this.outputValue = 'testing 123 - ' + this.name.value;
  }
}
