import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  file: File | null = null;

  selectFile(fileEvent: Event) {
    const target = fileEvent.target as HTMLInputElement;
    this.file = target.files?.[0] ?? null;
  }
}
