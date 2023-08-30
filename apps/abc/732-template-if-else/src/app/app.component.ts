import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf]
})
export class AppComponent {
  n = 0;

  increment() {
    this.n++;
  }
}
