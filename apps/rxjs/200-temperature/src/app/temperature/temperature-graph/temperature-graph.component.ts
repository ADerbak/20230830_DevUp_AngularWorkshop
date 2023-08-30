import { Component } from '@angular/core';

import { TemperatureService } from '../temperature.service';

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.scss']
})
export class TemperatureGraphComponent {
  graphData = this.ts.temperatureHistory;

  constructor(private ts: TemperatureService) {}
}
