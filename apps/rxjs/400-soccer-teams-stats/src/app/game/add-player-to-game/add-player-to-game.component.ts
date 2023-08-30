import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { GameModalTransfer } from '../../app.types';
import { GameService } from '../game.service';

@Component({
  selector: 'app-add-player-to-game',
  templateUrl: './add-player-to-game.component.html',
  styleUrls: ['./add-player-to-game.component.scss']
})
export class AddPlayerToGameComponent {
  playerOptions = this.game.players;
  chosenPlayer = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });
  saving = false;

  constructor(
    private dialogRef: MatDialogRef<AddPlayerToGameComponent>,
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) public game: GameModalTransfer
  ) {}

  async save() {
    this.saving = true;
    try {
      await this.gameService.addPlayerToGame(
        this.game.id,
        this.chosenPlayer.value
      );
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.saving = false;
    }
  }
}
