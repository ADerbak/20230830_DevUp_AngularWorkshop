import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import {
  CardWithName,
  GameModalTransfer,
  Player
} from '../../app.types';
import { AddCardToGameComponent } from '../add-card-to-game/add-card-to-game.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  @Input() cards!: CardWithName[];
  @Input() gameId!: string;
  @Input() players!: Player[];
  displayedColumns = ['player', 'color', 'minute'];

  constructor(private dialog: MatDialog) {}

  addCard() {
    const game: GameModalTransfer = {
      id: this.gameId,
      players: this.players
    };
    const config: MatDialogConfig = { data: game };
    this.dialog.open(AddCardToGameComponent, config).afterClosed();
  }
}
