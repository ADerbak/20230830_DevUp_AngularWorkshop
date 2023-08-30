import { Component } from '@angular/core';
import {
  RouterLinkActive,
  RouterLink,
  RouterOutlet
} from '@angular/router';

import { routeChange } from './routing.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeChange],
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet]
})
export class AppComponent {}
