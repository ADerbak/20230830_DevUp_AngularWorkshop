import { NgIf, AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { Company, CompanyLoader } from './company-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe]
})
export class AppComponent {
  company: Observable<Company>;
  showAgain = false;

  constructor(loader: CompanyLoader) {
    this.company = loader.loadOneCompany().pipe(shareReplay(1));
  }
}
