import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CarStateService } from '../car-state.service';

@Component({
  selector: 'app-validity-display',
  templateUrl: './validity-display.component.html',
  styleUrls: ['./validity-display.component.scss'],
  standalone: true,
  imports: [AsyncPipe]
})
export class ValidityDisplayComponent {
  ok: Observable<boolean>;
  message: Observable<string>;

  constructor(carStateService: CarStateService) {
    this.ok = carStateService.state.pipe(
      map(carState => carState.ok)
    );
    this.message = carStateService.state.pipe(
      map(carState => (carState.message ? carState.message : 'ok!'))
    );
  }
}
