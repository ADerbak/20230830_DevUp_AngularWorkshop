import { NgFor, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

import { FilmMeta, StarshipApiService } from './starship-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgFor, JsonPipe]
})
export class AppComponent {
  starships: FilmMeta[] = [];

  constructor(api: StarshipApiService) {
    api
      .loadStarships()
      .then(ships => (this.starships = ships))
      .catch(_err => (this.starships = []));
  }
}
