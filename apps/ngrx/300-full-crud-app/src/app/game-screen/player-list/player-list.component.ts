import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Player } from '../../api-types';
import {
  AddPlayerToGameComponent,
  AddPlayerToGameData
} from '../add-player-to-game/add-player-to-game.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
  @Input() players!: Player[];
  @Input() gameId!: string;

  @Output() playerListUpdated = new EventEmitter<void>();
  constructor(private dialog: MatDialog) {}

  addPlayer() {
    const data: AddPlayerToGameData = {
      gameId: this.gameId,
      existingPlayers: this.players
    };
    this.dialog
      .open(AddPlayerToGameComponent, { data })
      .afterClosed();
  }
}
