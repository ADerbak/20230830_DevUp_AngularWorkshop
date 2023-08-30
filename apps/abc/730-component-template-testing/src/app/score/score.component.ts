import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-show-score',
  template: `
    <p>
      <strong>
        Your score is:
        <span class="value-display">{{ value }}</span>
        !
      </strong>
    </p>
    <p>
      <button (click)="onNotify()">Notify</button>
    </p>
  `,
  standalone: true
})
export class ScoreComponent {
  @Input() value = 0;
  @Output() notify = new EventEmitter<string>();

  onNotify() {
    this.notify.emit('Your score was ' + this.value);
  }
}
