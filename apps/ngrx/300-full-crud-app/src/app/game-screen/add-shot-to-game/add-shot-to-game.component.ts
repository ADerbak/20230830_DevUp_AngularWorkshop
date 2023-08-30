import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { Player } from '../../api-types';
import { GameService } from '../../game.service';

export interface AddShotToGameData {
  gameId: string;
  existingPlayers: Player[];
}

function CantAssistYourselfValidator(
  g: AbstractControl
): ValidationErrors | null {
  const player = g.get('player');
  const assist = g.get('assist');
  if (player && assist && player.value === assist.value) {
    return {
      cantAssistYourself: true
    };
  }
  return null;
}

@Component({
  selector: 'app-add-shot-to-game',
  templateUrl: './add-shot-to-game.component.html',
  styleUrls: ['./add-shot-to-game.component.scss']
})
export class AddShotToGameComponent {
  shotForm = this.fb.group(
    {
      player: ['', Validators.required],
      assist: [''],
      scored: [true, Validators.required],
      minute: [0, Validators.required]
    },
    {
      validators: [CantAssistYourselfValidator]
    }
  );
  saving = false;

  constructor(
    private dialogRef: MatDialogRef<AddShotToGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddShotToGameData,
    private gs: GameService,
    private fb: NonNullableFormBuilder
  ) {}

  save() {
    this.saving = true;
    this.gs
      .addShotToGame({
        game: this.data.gameId,
        ...this.shotForm.value
      })
      .then(() => this.dialogRef.close())
      .catch(e => {
        console.log(e);
        this.saving = false;
      });
  }
}
