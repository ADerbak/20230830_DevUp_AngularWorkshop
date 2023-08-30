import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  map,
  merge,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap
} from 'rxjs';

import {
  cardTypes,
  selectedPlayerIdRouteParamName
} from '../../feature.constants';
import { PlayerService } from '../../player.service';

interface PlayerDataByGame {
  location: string;
  date: string;
  shots: number;
  goals: number;
  assists: number;
  redCard: boolean;
  yellowCard: boolean;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  player = this.ar.params.pipe(
    map(params => params[selectedPlayerIdRouteParamName]),
    switchMap(id => this.ps.playerWithStats(id)),
    shareReplay()
  );

  deleting = new Subject<string>();

  displayedColumns = [
    'gameName',
    'location',
    'date',
    'goals',
    'shots',
    'shotAverage',
    'assists',
    'yellowCard',
    'redCard'
  ];

  playerGameTableData: Observable<PlayerDataByGame[]> =
    this.player.pipe(
      map(p =>
        p.games.map(g => ({
          name: g.name,
          location: g.location,
          date: g.date,
          shots: p.shotsOnGoal.filter(s => s.game === g.id).length,
          goals: p.shotsOnGoal
            .filter(s => s.game === g.id)
            .filter(sog => sog.scored).length,
          assists: p.assists.filter(s => s.game === g.id).length,
          redCard:
            p.cards.filter(
              c => c.game === g.id && c.type === cardTypes['red']
            ).length > 0,
          yellowCard:
            p.cards.filter(
              c => c.game === g.id && c.type === cardTypes['yellow']
            ).length > 0
        }))
      )
    );

  canDelete = merge(
    this.playerGameTableData.pipe(
      map(td =>
        td.length > 0
          ? 'Cannot delete a player that has games'
          : undefined
      )
    ),
    this.deleting
  ).pipe(startWith('Loading player data'), shareReplay());

  constructor(
    private ar: ActivatedRoute,
    private ps: PlayerService,
    private router: Router
  ) {}

  updateName(newName: string) {
    return this.ps.changePlayerName(
      this.ar.snapshot.params[selectedPlayerIdRouteParamName],
      newName
    );
  }

  async delete() {
    this.deleting.next('Deletion in progress');
    try {
      await this.ps.deletePlayer(
        this.ar.snapshot.params[selectedPlayerIdRouteParamName]
      );
      await this.router.navigate(['players']);
    } catch (e) {
      this.deleting.next('');
    }
  }
}
