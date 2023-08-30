import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule, JsonPipe]
})
export class AppComponent {
  credentials: { login: string; password: string };

  constructor() {
    this.credentials = { login: '', password: '' };
  }

  // Event handler for form submit
  onLogin(): void {
    console.log('Form Submitted', this.credentials);
  }
}
