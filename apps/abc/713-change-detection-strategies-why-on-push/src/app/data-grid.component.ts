import { NgFor, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

const length = 50;

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  /*
      Switch strategies and compare the CPU utilization
      of your Web browser in your computer's task manager
     */
  // changeDetection: ChangeDetectionStrategy.OnPush
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [NgFor, DecimalPipe]
})
export class DataGridComponent {
  rows = Array.from({ length }, () =>
    Array.from({ length }, () => ({ total: Math.random() }))
  );
}
