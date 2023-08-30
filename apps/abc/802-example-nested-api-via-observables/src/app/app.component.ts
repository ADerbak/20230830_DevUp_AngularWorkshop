import { NgFor, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { FilmMeta, StarshipApiService } from './starship-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class AppComponent {
  starships: Observable<FilmMeta[]>;

  constructor(api: StarshipApiService) {
    this.starships = api.starships();
  }
}
