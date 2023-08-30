import { NgFor, NgClass } from '@angular/common';
import { Component } from '@angular/core';

import { overshootWidth } from './animations';
import { regionalFinancialInfo } from './records';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [overshootWidth],
  standalone: true,
  imports: [NgFor, NgClass]
})
export class AppComponent {
  regionInfo = regionalFinancialInfo;
  unitsScale = 100 / 10000;
  revenueScale = 100 / 50000000;

  // Avoid computation in templates
  regionClass(regionName: string) {
    return 'region-' + regionName;
  }
}
