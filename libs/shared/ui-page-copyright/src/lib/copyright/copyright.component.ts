import { Component, Input } from '@angular/core';

@Component({
  selector: 'abc-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent {
  @Input() year = '';
}
