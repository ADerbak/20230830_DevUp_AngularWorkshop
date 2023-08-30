import { NgIf, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'vst-filter-state-display',
  templateUrl: './filter-state-display.component.html',
  styleUrls: ['./filter-state-display.component.scss'],
  standalone: true,
  imports: [NgIf, DatePipe]
})
export class FilterStateDisplayComponent {
  filterForm: FormGroup<{
    region: FormControl<string>;
    dateTo: FormControl<string>;
    dateFrom: FormControl<string>;
    minor: FormControl<boolean>;
    adults: FormControl<boolean>;
    middleAged: FormControl<boolean>;
    retired: FormControl<boolean>;
  }>;

  constructor(dashboardService: DashboardService) {
    this.filterForm = dashboardService.filterForm;
  }
}
