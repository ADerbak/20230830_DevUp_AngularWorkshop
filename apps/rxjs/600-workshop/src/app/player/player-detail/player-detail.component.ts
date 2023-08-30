import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, merge, Subject } from 'rxjs';

import { selectedPlayerIdRouteParamName } from '../../app.constants';
import { PlayerStatsService } from '../player-stats.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnDestroy {
  playerIdSub = this.activatedRoute.params
    .pipe(map(params => params[selectedPlayerIdRouteParamName]))
    .subscribe(id => this.playerService.setSelectedPlayer(id));

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

  player = this.playerStatsService.selectedPlayerWithStats;

  playerGameTableData =
    this.playerStatsService.gameBreakdownForSelectedPlayer;

  canDelete = merge(
    this.activatedRoute.params.pipe(
      map(params => params[selectedPlayerIdRouteParamName]),
      map(() => 'Loading player data')
    ),
    this.playerGameTableData.pipe(
      map(td =>
        td.length > 0
          ? 'Cannot delete a player that has games'
          : undefined
      )
    ),
    this.deleting
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private playerStatsService: PlayerStatsService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.playerIdSub.unsubscribe();
  }

  updateName(newName: string) {
    return this.playerService.changePlayerName(
      this.activatedRoute.snapshot.params[
        selectedPlayerIdRouteParamName
      ],
      newName
    );
  }

  delete() {
    this.deleting.next('Deletion in progress');
    this.playerService
      .deletePlayer(
        this.activatedRoute.snapshot.params[
          selectedPlayerIdRouteParamName
        ]
      )
      .then(() => this.router.navigate(['players']))
      .catch(() => this.deleting.next(''));
  }
}
