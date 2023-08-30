import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {
  selectedGameIdRouteParamName,
  selectedPlayerIdRouteParamName
} from './feature.constants';
import { AddCardToGameComponent } from './game-screen/add-card-to-game/add-card-to-game.component';
import { AddGameComponent } from './game-screen/add-game/add-game.component';
import { AddPlayerToGameComponent } from './game-screen/add-player-to-game/add-player-to-game.component';
import { AddShotToGameComponent } from './game-screen/add-shot-to-game/add-shot-to-game.component';
import { CardListComponent } from './game-screen/card-list/card-list.component';
import { GameComponent } from './game-screen/game/game.component';
import { GamesComponent } from './game-screen/games/games.component';
import { PlayerListComponent } from './game-screen/player-list/player-list.component';
import { ShotListComponent } from './game-screen/shot-list/shot-list.component';
import { GameService } from './game.service';
import { NgrxPlayerService } from './ngrx-player.service';
import { AddPlayerComponent } from './player-screen/add-player/add-player.component';
import { PlayerComponent } from './player-screen/player/player.component';
import { PlayerNameEditorComponent } from './player-screen/player-name-editor/player-name-editor.component';
import { PlayersComponent } from './player-screen/players/players.component';
import { PlayerService } from './player.service';
import { SoccerTeamStatsComponent } from './soccer-team-stats.component';
import {
  cardsFeature,
  gamesFeature,
  playersFeature,
  shotsFeature
} from './state/reducers';
import { SoccerTeamEffects } from './state/soccer-team.effects';

const routes: Routes = [
  {
    path: '',
    component: SoccerTeamStatsComponent,
    children: [
      {
        path: 'players',
        component: PlayersComponent,
        children: [
          {
            path: `:${selectedPlayerIdRouteParamName}`,
            component: PlayerComponent
          }
        ]
      },
      {
        path: 'games',
        component: GamesComponent,
        children: [
          {
            path: `:${selectedGameIdRouteParamName}`,
            component: GameComponent
          }
        ]
      },
      { path: '', redirectTo: 'players', pathMatch: 'prefix' }
    ]
  }
];

@NgModule({
  declarations: [
    AddCardToGameComponent,
    AddGameComponent,
    AddPlayerComponent,
    AddPlayerToGameComponent,
    AddShotToGameComponent,
    CardListComponent,
    GameComponent,
    GamesComponent,
    PlayerComponent,
    PlayerListComponent,
    PlayerNameEditorComponent,
    PlayersComponent,
    ShotListComponent,
    SoccerTeamStatsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    StoreModule.forFeature(cardsFeature),
    StoreModule.forFeature(gamesFeature),
    StoreModule.forFeature(playersFeature),
    StoreModule.forFeature(shotsFeature),
    EffectsModule.forFeature([SoccerTeamEffects]),
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: PlayerService,
      useClass: NgrxPlayerService
    },
    GameService
  ]
})
export class SoccerTeamStatsModule {}
