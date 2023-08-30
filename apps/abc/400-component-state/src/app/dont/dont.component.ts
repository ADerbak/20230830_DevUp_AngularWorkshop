import { Component } from '@angular/core';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { Task } from './types';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

/*
  Notice the bloat this top level component has taken on. It needs
  to "own" the data in order to make the appropriate modifications.
  Problems: file size/scope, mixing of concerns, all other problems
  associated with monoliths.
*/

@Component({
  selector: 'app-dont-example',
  templateUrl: './dont.component.html',
  standalone: true,
  imports: [WorkTaskListComponent, HomeTaskListComponent]
})
export class DontComponent {
  doneWork = [
    'file paperwork',
    'send emails',
    'work on project A',
    'submit report to manager'
  ];

  todoWork = ['work on project B', 'update task list'];

  doneHome = [
    'cook dinner',
    'go grocery shopping',
    'sweep the floors',
    'do the laundry'
  ];

  todoHome = ['fix the leaky faucet', 'mow the lawn'];

  // This method is a perfect example of the complexity that's created when
  // all of your state is managed from one location
  toggleTask(toggle: Task, type: string) {
    if (toggle.complete && type === 'work') {
      this.doneWork = this.doneWork.filter(
        curTask => curTask !== toggle.task
      );
      this.todoWork.push(toggle.task);
    } else if (!toggle.complete && type === 'work') {
      this.todoWork = this.todoWork.filter(
        curTask => curTask !== toggle.task
      );
      this.doneWork.push(toggle.task);
    } else if (toggle.complete && type === 'home') {
      this.doneHome = this.doneHome.filter(
        curTask => curTask !== toggle.task
      );
      this.todoHome.push(toggle.task);
    } else if (!toggle.complete && type === 'home') {
      this.todoHome = this.todoHome.filter(
        curTask => curTask !== toggle.task
      );
      this.doneHome.push(toggle.task);
    }
  }

  completeAll() {
    this.todoHome.forEach(task => this.doneHome.push(task));
    this.todoHome = [];
    this.todoWork.forEach(task => this.doneWork.push(task));
    this.todoWork = [];
  }
}
