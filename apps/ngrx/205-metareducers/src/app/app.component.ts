import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { appActions } from './app.actions';
import { undoRedoActions } from './undo-redo/undo-redo.actions';
import {
  selectRedoAvailable,
  selectUndoAvailable
} from './undo-redo/undo-redo.selectors';
import { selectUserName } from './user-profile/user-profile.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName: Observable<string>;
  undoItem: Observable<boolean>;
  redoItem: Observable<boolean>;

  constructor(private store: Store) {
    this.userName = store.select(selectUserName);
    this.undoItem = this.store.select(selectUndoAvailable);
    this.redoItem = this.store.select(selectRedoAvailable);
  }

  clear() {
    this.store.dispatch(appActions.clearState());
  }

  undo() {
    this.store.dispatch(undoRedoActions.undoAction());
  }

  redo() {
    this.store.dispatch(undoRedoActions.redoAction());
  }
}
