import { Component } from '@angular/core';

import { TodoListComponent } from '../../todo-list/todo-list.component';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  standalone: true,
  imports: [TodoListComponent]
})
export class HomeTaskListComponent {
  done = [
    'cook dinner',
    'go grocery shopping',
    'sweep the floors',
    'do the laundry'
  ];

  todo = ['fix the leaky faucet', 'mow the lawn'];

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  toggleTask(task: string, complete: boolean) {
    if (complete) {
      this.done = this.done.filter(curTask => curTask !== task);
      this.todo.push(task);
    } else {
      this.todo = this.todo.filter(curTask => curTask !== task);
      this.done.push(task);
    }
  }
}
