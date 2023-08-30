import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  retry,
  startWith,
  switchMap
} from 'rxjs';

import { ImageMetadata } from '../types';

import { RedditImageSearchService } from './reddit-image-search.service';

@Component({
  selector: 'app-reddit-search',
  templateUrl: './reddit-search.component.html',
  styleUrls: ['./reddit-search.component.scss']
})
export class RedditSearchComponent {
  subReddits = [
    'aww',
    'wholesomememes',
    'mildlyinteresting',
    'awesome'
  ];
  subReddit = new FormControl(this.subReddits[0], {
    nonNullable: true
  });
  search = new FormControl('', { nonNullable: true });
  results: Observable<ImageMetadata[]>;

  constructor(ris: RedditImageSearchService) {
    const validSubReddit = this.subReddit.valueChanges.pipe(
      startWith<string>(this.subReddit.value as string)
    );

    const validSearch = this.search.valueChanges.pipe(
      startWith<string>(this.search.value as string),
      map(search => search.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      filter(search => search !== '')
    );

    const combinedCriteria = combineLatest([
      validSubReddit,
      validSearch
    ]).pipe(map(([subReddit, search]) => ({ subReddit, search })));

    this.results = combinedCriteria.pipe(
      switchMap(val =>
        ris.search(val.subReddit, val.search).pipe(
          retry(3),
          // Clear previous entries while waiting
          startWith([])
        )
      )
    );
  }
}
