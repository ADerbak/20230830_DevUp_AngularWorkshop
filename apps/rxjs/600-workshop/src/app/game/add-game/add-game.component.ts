import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

import { GameService } from '../game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent {
  saving = false;
  locationInput = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });
  dateInput = new FormControl(moment(), {
    nonNullable: true,
    validators: Validators.required
  });
  nameInput = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });

  constructor(
    private dialogRef: MatDialogRef<AddGameComponent>,
    private gameService: GameService
  ) {}

  async save() {
    this.saving = true;
    try {
      await this.gameService.addGame(
        this.locationInput.value,
        this.dateInput.value.format('YYYY-MM-DD'),
        this.nameInput.value
      );
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.saving = false;
    }
  }
}
