import { Component } from '@angular/core';

import {
  BlueWrapperComponent,
  BlueWrapperChildrenComponent
} from './blue-wrapper.component';
import { GreenWrapperComponent } from './green-wrapper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    GreenWrapperComponent,
    BlueWrapperComponent,
    BlueWrapperChildrenComponent
  ]
})
export class AppComponent {}
