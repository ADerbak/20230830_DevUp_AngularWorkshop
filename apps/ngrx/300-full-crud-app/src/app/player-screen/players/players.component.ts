import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PlayerService } from '../../player.service';
import { AddPlayerComponent } from '../add-player/add-player.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {
  players = this.ps.players;
  constructor(private ps: PlayerService, private dialog: MatDialog) {}

  addPlayer() {
    this.dialog.open(AddPlayerComponent);
  }
}
