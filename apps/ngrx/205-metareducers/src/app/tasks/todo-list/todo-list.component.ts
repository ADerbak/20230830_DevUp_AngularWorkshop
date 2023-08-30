import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
  @Input() list: string[] = [];
  @Input() selected = false;

  @Output() setTaskStatus = new EventEmitter<string>();

  setStat(task: string) {
    this.setTaskStatus.emit(task);
  }
}
