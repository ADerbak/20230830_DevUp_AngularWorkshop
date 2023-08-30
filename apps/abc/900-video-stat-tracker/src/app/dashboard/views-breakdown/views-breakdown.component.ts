import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FilterStateDisplayComponent } from './filter-state-display/filter-state-display.component';
import { GraphData } from './graph-helper';
import { GraphService } from './graph.service';

@Component({
  selector: 'vst-views-breakdown',
  templateUrl: './views-breakdown.component.html',
  styleUrls: ['./views-breakdown.component.scss'],
  standalone: true,
  imports: [FilterStateDisplayComponent, BarChartComponent, AsyncPipe]
})
export class ViewsBreakdownComponent {
  graphData: Observable<GraphData>;

  constructor(graphService: GraphService) {
    this.graphData = graphService.graphData;
  }
}
