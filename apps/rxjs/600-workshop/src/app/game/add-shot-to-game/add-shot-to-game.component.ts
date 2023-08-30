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

import { GameModalTransfer } from '../../app.types';
import { GameService } from '../game.service';

function CantAssistYourselfValidator(
  group: AbstractControl
): ValidationErrors | null {
  const player = group.get('player');
  const assist = group.get('assist');
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
    private gs: GameService,
    private fb: NonNullableFormBuilder,
    @Inject(MAT_DIALOG_DATA) public game: GameModalTransfer
  ) {}

  save() {
    this.saving = true;
    this.gs
      .addShotToGame({
        game: this.game.id,
        ...this.shotForm.value
      })
      .then(() => this.dialogRef.close())
      .catch(e => {
        console.log(e);
        this.saving = false;
      });
  }
}
