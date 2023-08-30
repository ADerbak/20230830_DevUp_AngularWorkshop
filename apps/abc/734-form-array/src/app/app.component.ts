import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { FormSelectComponent } from './form-select/form-select.component';
import { FormToppingsComponent } from './form-toppings/form-toppings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    FormSelectComponent,
    FormToppingsComponent
  ]
})
export class AppComponent {
  pizzasFormArray: FormArray;
  activePizza = 0;

  sizes = ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'];
  crusts = ['Original', 'Thin', 'Cheese Filled', 'Gluten-Free'];
  sauceTypes = ['None', 'Original', 'White Sauce', 'BBQ', 'Ranch'];
  sauceAmounts = ['Normal', 'Light', 'Extra'];
  cheeseTypes = ['None', 'Original', '3-Cheese Blend', 'Parmesan'];
  cheeseAmounts = ['Normal', 'Light', 'Extra'];

  get pizzaFormGroups() {
    return this.pizzasFormArray.controls as FormGroup[];
  }

  constructor(private fb: FormBuilder) {
    this.pizzasFormArray = fb.array([]);
    this.addNewPizza();
  }

  getFormControlFromForm(form: FormGroup, key: string) {
    return form.get(key) as FormControl;
  }

  getToppingArrayFromForm(form: FormGroup) {
    return form.get('toppings') as FormArray;
  }

  logForm() {
    console.log(this.pizzasFormArray.value);
  }

  addNewPizza() {
    this.pizzasFormArray.push(
      this.fb.group({
        size: this.fb.control(''),
        crust: this.fb.control(''),
        sauceType: this.fb.control(''),
        sauceAmount: this.fb.control(''),
        cheeseType: this.fb.control(''),
        cheeseAmount: this.fb.control(''),
        toppings: this.fb.array([this.fb.control('')])
      })
    );
    this.activePizza = this.pizzasFormArray.length - 1;
  }

  removePizza(index: number) {
    this.pizzasFormArray.removeAt(index);
  }

  setActivePizzaForm(index: number) {
    this.pizzasFormArray.at(0).get('toppings');
    if (this.activePizza === index) {
      this.activePizza = -1;
    } else {
      this.activePizza = index;
    }
  }
}
