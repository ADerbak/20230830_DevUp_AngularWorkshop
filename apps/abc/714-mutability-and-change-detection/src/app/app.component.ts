import { Component } from '@angular/core';

import { ItemService } from './item/item.service';
import { TodoListDefaultStrategyComponent } from './todo-list/todo-list-default-strategy.component';
import { TodoListOnpushStrategyComponent } from './todo-list/todo-list-onpush-strategy.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    TodoListDefaultStrategyComponent,
    TodoListOnpushStrategyComponent
  ]
})
export class AppComponent {
  constructor(public ids: ItemService) {}

  addTodo() {
    const description = window.prompt('Description:');
    if (description) {
      this.ids.addItem({ description, completed: false });
    }
  }
}
