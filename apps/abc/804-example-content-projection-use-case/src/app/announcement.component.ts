import { Component } from '@angular/core';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement.component.html',
  standalone: true
})
export class AnnouncementComponent {}

@Component({
  selector:
    'app-announcement-title, app-announcement-image, app-announcement-description',
  template: `
    <ng-content></ng-content>
  `,
  standalone: true
})
export class AnnouncementComponentChildrenComponent {}
