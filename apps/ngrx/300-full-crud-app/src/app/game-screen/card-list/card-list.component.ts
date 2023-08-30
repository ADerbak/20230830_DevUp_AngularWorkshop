import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CardWithName, Player } from '../../api-types';
import {
  AddCardToGameComponent,
  AddCardToGameData
} from '../add-card-to-game/add-card-to-game.component';

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

  addShot() {
    const data: AddCardToGameData = {
      gameId: this.gameId,
      existingPlayers: this.players
    };
    this.dialog.open(AddCardToGameComponent, { data }).afterClosed();
  }
}
