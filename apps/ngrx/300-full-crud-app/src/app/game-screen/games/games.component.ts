import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GameService } from '../../game.service';
import { AddGameComponent } from '../add-game/add-game.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  games = this.gs.games;

  constructor(private gs: GameService, private dialog: MatDialog) {}

  addGame() {
    this.dialog.open(AddGameComponent);
  }
}
