import { NgFor, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CarStateService, wheelTypes } from '../car-state.service';

interface ITypeQty {
  wt: string;
  q: number;
}

@Component({
  selector: 'app-wheel-selector',
  templateUrl: './wheel-selector.component.html',
  styleUrls: ['./wheel-selector.component.scss'],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class WheelSelectorComponent {
  typesAndQtys: Observable<ITypeQty[]>;

  constructor(private carStateService: CarStateService) {
    // If you need to combine synchronous and asynchronous data
    // in the template, do it in the typescript
    this.typesAndQtys = this.carStateService.state.pipe(
      map(carState =>
        carState.wheelQtys.map((q, index) => ({
          wt: wheelTypes[index],
          q
        }))
      )
    );
  }

  more(i: number) {
    this.carStateService.changeWheelQty(i, 1);
  }

  less(i: number) {
    this.carStateService.changeWheelQty(i, -1);
  }
}
