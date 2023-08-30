import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule, Routes } from '@angular/router';

import { selectedGameIdRouteParamName } from '../app.constants';

import { AddCardToGameComponent } from './add-card-to-game/add-card-to-game.component';
import { AddGameComponent } from './add-game/add-game.component';
import { AddPlayerToGameComponent } from './add-player-to-game/add-player-to-game.component';
import { AddShotToGameComponent } from './add-shot-to-game/add-shot-to-game.component';
import { CardListComponent } from './card-list/card-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GamesComponent } from './games/games.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { ShotListComponent } from './shot-list/shot-list.component';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
    children: [
      {
        path: `:${selectedGameIdRouteParamName}`,
        component: GameDetailComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AddCardToGameComponent,
    AddGameComponent,
    AddPlayerToGameComponent,
    AddShotToGameComponent,
    CardListComponent,
    GameDetailComponent,
    GameDetailComponent,
    GamesComponent,
    PlayerListComponent,
    ShotListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class GameModule {}
