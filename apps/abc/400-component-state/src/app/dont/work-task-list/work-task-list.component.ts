import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../types';

/*

  Notice that the component becomes a pass through...
  Q: So why not just remove the component?
  A: Why use multiple components at all?

*/
@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  standalone: true,
  imports: [TodoListComponent]
})
export class WorkTaskListComponent {
  @Input() done: string[] = [];
  @Input() todo: string[] = [];
  @Output() toggleTask = new EventEmitter<Task>();

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  toggle(outputTask: string, outputComplete: boolean) {
    const outputToDo = {
      task: outputTask,
      complete: outputComplete
    };
    this.toggleTask.emit(outputToDo);
  }
}
