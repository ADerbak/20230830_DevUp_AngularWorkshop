import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Item } from '../item/item-types';

import { TodoItemDetailComponent } from './todo-item-detail.component';

@Component({
  selector: 'app-todo-list-default-strategy',
  templateUrl: './todo-list.component.html',
  // changeDetection: ChangeDetectionStrategy.Default
  standalone: true,
  imports: [NgFor, TodoItemDetailComponent]
})
export class TodoListDefaultStrategyComponent {
  @Input() todoItems: Item[] = [];
  @Output() toggleItem = new EventEmitter<number>();
}
