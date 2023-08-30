import { Component } from '@angular/core';

@Component({
  selector: 'app-collection-panel',
  templateUrl: './collection-panel.component.html',
  standalone: true
})
export class CollectionPanelComponent {}

@Component({
  selector:
    'app-collection-panel-header, app-collection-panel-content, app-collection-panel-footer',
  template: `
    <ng-content></ng-content>
  `,
  standalone: true
})
export class CollectionPanelChildrenComponent {}
