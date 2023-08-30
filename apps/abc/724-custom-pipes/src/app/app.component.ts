import {
  NgFor,
  UpperCasePipe,
  LowerCasePipe,
  DatePipe
} from '@angular/common';
import { Component } from '@angular/core';

import {
  CheckmarkPipe,
  ContainsXPipe,
  DefaultToStringPipe,
  FieldRangePipe,
  SentenceCasePipe
} from './pipes';

interface Car {
  brand: string;
  year: number;
  color: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    UpperCasePipe,
    LowerCasePipe,
    DatePipe,
    CheckmarkPipe,
    ContainsXPipe,
    DefaultToStringPipe,
    FieldRangePipe,
    SentenceCasePipe
  ]
})
export class AppComponent {
  myDate = new Date();
  items: string[] = ['abc', '123', 'xyzabcdef', 'abc123', '8756'];
  cars: Car[] = [
    { brand: 'Toyota', year: 2014, color: 'Red' },
    { brand: 'Toyota', year: 2011, color: 'Green' },
    { brand: 'Ford', year: 2005, color: 'Black' },
    { brand: 'Ford', year: 2009, color: 'White' },
    { brand: 'Ford', year: 2013, color: 'Yellow' }
  ];
  value12345 = 12345;
  valueEmptyString = '';
  valueHi = 'Hi!';
}
