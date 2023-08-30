import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, share, switchMap } from 'rxjs';

import { selectedGameIdRouteParamName } from '../../feature.constants';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  gameId = this.ar.params.pipe(
    map(p => p[selectedGameIdRouteParamName])
  );
  game = this.gameId.pipe(
    switchMap(id => this.gs.getGameWithDetails(id)),
    share()
  );
  deleting = false;

  constructor(
    private gs: GameService,
    private ar: ActivatedRoute,
    private router: Router
  ) {}

  delete() {
    this.deleting = true;
    this.gs
      .deleteGame(
        this.ar.snapshot.params[selectedGameIdRouteParamName]
      )
      .then(() => this.router.navigate(['games']))
      .catch(() => (this.deleting = false));
  }
}
