import { Component, Input } from '@angular/core';

import { UrlHandler } from '../types';

@Component({
  selector: 'oasis-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title = '';
  @Input() documents: UrlHandler[] = [];
}
