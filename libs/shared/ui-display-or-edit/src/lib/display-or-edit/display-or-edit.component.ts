import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'oasis-display-or-edit',
  templateUrl: 'display-or-edit.component.html',
  styleUrls: ['display-or-edit.component.scss']
})
export class DisplayOrEditComponent {
  @Input() control?: FormControl;
  @Input() set useTextArea(val: boolean | string) {
    this.isTextArea = val === '' || !!val;
  }
  @Input() set useDelete(val: boolean | string) {
    this.hasDeleteButton = val === '' || !!val;
  }
  @Input() actionsPosition: 'before' | 'after' = 'before';

  @Output() updated = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  hasDeleteButton = false;
  isTextArea = false;
  editing = false;

  finishEdit() {
    this.editing = false;
    this.updated.emit();
  }
}
