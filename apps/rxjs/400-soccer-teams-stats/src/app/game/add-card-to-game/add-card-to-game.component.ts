import { Component, Inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { cardTypes, cardTypesList } from '../../app.constants';
import { GameModalTransfer } from '../../app.types';
import { GameService } from '../game.service';

@Component({
  selector: 'app-add-card-to-game',
  templateUrl: './add-card-to-game.component.html',
  styleUrls: ['./add-card-to-game.component.scss']
})
export class AddCardToGameComponent {
  cardForm = this.fb.group({
    player: ['', Validators.required],
    type: [cardTypes['yellow']],
    minute: [0, Validators.required]
  });
  saving = false;
  cardtypes = cardTypesList;

  constructor(
    private dialogRef: MatDialogRef<AddCardToGameComponent>,
    private gameService: GameService,
    private fb: NonNullableFormBuilder,
    @Inject(MAT_DIALOG_DATA) public game: GameModalTransfer
  ) {}

  async save() {
    this.saving = true;
    try {
      await this.gameService.addCardToGame({
        game: this.game.id,
        ...this.cardForm.value
      });
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.saving = false;
    }
  }
}
