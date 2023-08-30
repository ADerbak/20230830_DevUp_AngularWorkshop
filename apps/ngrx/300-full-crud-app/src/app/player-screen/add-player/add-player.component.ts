import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent {
  playerInput = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });
  saving = false;

  constructor(
    private dialogRef: MatDialogRef<AddPlayerComponent>,
    private ps: PlayerService
  ) {}

  save() {
    this.saving = true;
    this.ps
      .addPlayer(this.playerInput.value)
      .then(() => this.dialogRef.close())
      .catch(e => {
        console.log(e);
        this.saving = false;
      });
  }
}
