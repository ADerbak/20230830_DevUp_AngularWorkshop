import { Component, Inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { CardType, Player } from '../../api-types';
import { cardTypes } from '../../feature.constants';
import { GameService } from '../../game.service';

export interface AddCardToGameData {
  gameId: string;
  existingPlayers: Player[];
}

@Component({
  selector: 'app-add-card-to-game',
  templateUrl: './add-card-to-game.component.html',
  styleUrls: ['./add-card-to-game.component.scss']
})
export class AddCardToGameComponent {
  cardForm = this.fb.group({
    player: ['', Validators.required],
    type: ['yellow' as CardType],
    minute: [0, Validators.required]
  });
  saving = false;
  cardtypes = Object.keys(cardTypes).map(k => cardTypes[k]);

  constructor(
    private dialogRef: MatDialogRef<AddCardToGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddCardToGameData,
    private gs: GameService,
    private fb: NonNullableFormBuilder
  ) {}

  save() {
    this.saving = true;
    this.gs
      .addCardToGame({
        game: this.data.gameId,
        ...this.cardForm.value
      })
      .then(() => this.dialogRef.close())
      .catch(e => {
        console.log(e);
        this.saving = false;
      });
  }
}
