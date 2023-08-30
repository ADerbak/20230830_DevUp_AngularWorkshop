import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

import { selectedGameIdRouteParamName } from '../../app.constants';
import { GameStatsService } from '../game-stats.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnDestroy {
  gameIdSub = this.ar.params
    .pipe(map(params => params[selectedGameIdRouteParamName]))
    .subscribe(id => this.gameService.setgame(id));

  gameDetails = this.gameStatsService.currentGameDetails;
  deleting = false;
  playersNotInGame = this.gameStatsService.playersNotInGame;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private gameStatsService: GameStatsService
  ) {}

  delete() {
    this.deleting = true;
    this.gameService
      .deleteGame(
        this.ar.snapshot.params[selectedGameIdRouteParamName]
      )
      .then(() => this.router.navigate(['games']))
      .catch(() => (this.deleting = false));
  }

  ngOnDestroy() {
    this.gameIdSub.unsubscribe();
  }
}
