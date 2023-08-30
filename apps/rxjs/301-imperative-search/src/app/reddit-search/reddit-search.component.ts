import { Component } from '@angular/core';
import { debounce } from 'lodash-es';

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
  subReddit = this.subReddits[0];
  search = '';
  results: ImageMetadata[] = [];
  private lastSubreddit = '';
  private lastSearch = '';

  constructor(private ris: RedditImageSearchService) {
    // The lodash debounce function can potentially return undefined, but that isn't
    // a practical problem in this use case, so we override the type.
    this.findResults = debounce(
      this.findResults.bind(this),
      500
    ) as () => Promise<void>;
  }

  async findResults() {
    const search = this.search.trim();
    const subReddit = this.subReddit.trim();
    const noChange =
      search === this.lastSearch && subReddit === this.lastSubreddit;
    const emptySearch = !this.search || !this.subReddit;
    if (noChange || emptySearch) {
      return;
    }
    this.results = [];
    this.lastSearch = search;
    this.lastSubreddit = subReddit;
    this.results = await this.ris.search(subReddit, search);
  }
}
