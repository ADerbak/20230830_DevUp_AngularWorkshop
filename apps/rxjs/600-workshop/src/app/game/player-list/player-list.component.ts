import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GameModalTransfer, Player } from '../../app.types';
import { AddPlayerToGameComponent } from '../add-player-to-game/add-player-to-game.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
  @Input() players: Player[] = [];
  @Input() playersNotInGame: Player[] = [];
  @Input() gameId: string | undefined;
  @Output() playerListUpdated = new EventEmitter<void>();
  constructor(private dialog: MatDialog) {}

  addPlayer() {
    if (this.gameId) {
      const game: GameModalTransfer = {
        id: this.gameId,
        players: this.playersNotInGame
      };
      this.dialog
        .open(AddPlayerToGameComponent, { data: game })
        .afterClosed();
    }
  }
}
