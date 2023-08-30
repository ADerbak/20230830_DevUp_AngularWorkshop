import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';

import { selectedPlayerIdRouteParamName } from '../app.constants';

import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerNameEditorComponent } from './player-name-editor/player-name-editor.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersComponent,
    children: [
      {
        path: `:${selectedPlayerIdRouteParamName}`,
        component: PlayerDetailComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AddPlayerComponent,
    PlayerDetailComponent,
    PlayerNameEditorComponent,
    PlayersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule
  ]
})
export class PlayerModule {}
