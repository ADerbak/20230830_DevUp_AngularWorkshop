import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  template: `
    <h2>Hello {{ name | async }}!</h2>
    <p>I am a sample component.</p>
  `,
  standalone: true,
  imports: [AsyncPipe]
})
export class NameComponent {
  name: Observable<string>;

  constructor(route: ActivatedRoute) {
    this.name = route.paramMap.pipe(
      map(params => params.get('name') as string)
    );
  }
}
