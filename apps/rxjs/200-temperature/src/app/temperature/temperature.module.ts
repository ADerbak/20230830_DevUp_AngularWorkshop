import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { LineGraphComponent } from './line-graph/line-graph.component';
import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';

@NgModule({
  declarations: [LineGraphComponent, TemperatureGraphComponent],
  exports: [TemperatureGraphComponent],
  imports: [CommonModule, MatCardModule]
})
export class TemperatureModule {}
