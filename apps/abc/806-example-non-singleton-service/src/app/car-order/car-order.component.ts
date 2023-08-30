import { Component } from '@angular/core';

import { AxleSelectorComponent } from '../axle-selector/axle-selector.component';
import { CarStateService } from '../car-state.service';
import { ValidityDisplayComponent } from '../validity-display/validity-display.component';
import { WheelSelectorComponent } from '../wheel-selector/wheel-selector.component';

@Component({
  selector: 'app-car-order',
  templateUrl: './car-order.component.html',
  styleUrls: ['./car-order.component.scss'],
  providers: [CarStateService],
  standalone: true,
  imports: [
    AxleSelectorComponent,
    WheelSelectorComponent,
    ValidityDisplayComponent
  ]
})
export class CarOrderComponent {}
