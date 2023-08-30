import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CarStateService } from '../car-state.service';

@Component({
  selector: 'app-axle-selector',
  templateUrl: './axle-selector.component.html',
  standalone: true,
  imports: [AsyncPipe]
})
export class AxleSelectorComponent {
  n: Observable<number>;

  constructor(private carStateService: CarStateService) {
    this.n = this.carStateService.state.pipe(
      map(carState => carState.nAxles)
    );
  }

  more() {
    this.carStateService.changeAxles(1);
  }

  less() {
    this.carStateService.changeAxles(-1);
  }
}
