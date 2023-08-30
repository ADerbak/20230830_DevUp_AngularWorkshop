import { Component } from '@angular/core';

import { ManagerComponent } from './manager.component';

@Component({
  selector: 'app-root',
  template: '<app-manager-cmp></app-manager-cmp>',
  standalone: true,
  imports: [ManagerComponent]
})
export class AppComponent {}
