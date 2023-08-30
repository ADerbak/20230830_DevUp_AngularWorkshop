import { Component } from '@angular/core';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

@Component({
  selector: 'app-do-example',
  templateUrl: './do.component.html',
  standalone: true,
  imports: [WorkTaskListComponent, HomeTaskListComponent]
})
export class DoComponent {}
