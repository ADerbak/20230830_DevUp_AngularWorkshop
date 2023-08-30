import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { map } from 'rxjs';

import { Player } from '../../api-types';
import { GameService } from '../../game.service';
import { PlayerService } from '../../player.service';

export interface AddPlayerToGameData {
  gameId: string;
  existingPlayers: Player[];
}

@Component({
  selector: 'app-add-player-to-game',
  templateUrl: './add-player-to-game.component.html',
  styleUrls: ['./add-player-to-game.component.scss']
})
export class AddPlayerToGameComponent {
  playerOptions = this.ps.players.pipe(
    map(players =>
      players.filter(
        p => !this.data.existingPlayers.find(x => x.id === p.id)
      )
    )
  );
  chosenPlayer = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });
  saving = false;

  constructor(
    private dialogRef: MatDialogRef<AddPlayerToGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddPlayerToGameData,
    private ps: PlayerService,
    private gs: GameService
  ) {}

  save() {
    this.saving = true;
    this.gs
      .addPlayerToGame(this.data.gameId, this.chosenPlayer.value)
      .then(() => this.dialogRef.close())
      .catch(e => {
        console.log(e);
        this.saving = false;
      });
  }
}
