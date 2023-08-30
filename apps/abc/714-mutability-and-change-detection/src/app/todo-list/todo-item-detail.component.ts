import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { Item } from '../item/item-types';

@Component({
  selector: 'app-item-detail',
  templateUrl: './todo-item-detail.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true
})
export class TodoItemDetailComponent {
  @Input() item: Item | undefined;
  @Output() toggle = new EventEmitter<void>();

  @HostListener('click')
  onClick() {
    this.toggle.emit();
  }

  transform(input: boolean) {
    const checkMark = '\u2713';
    const checkbox = '\u2751';
    return input ? checkMark : checkbox;
  }
}
