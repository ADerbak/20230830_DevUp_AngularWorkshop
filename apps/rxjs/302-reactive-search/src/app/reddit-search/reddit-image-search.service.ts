import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  ImageMetadata,
  RedditResponse,
  RedditResponseChild
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class RedditImageSearchService {
  constructor(private http: HttpClient) {}

  search(
    subReddit: string,
    search: string
  ): Observable<ImageMetadata[]> {
    const url = `https://www.reddit.com/r/${subReddit}/search.json`;
    const params = { restrict_sr: 'on', q: search };

    return this.http
      .get<RedditResponse>(url, { params })
      .pipe(map(translateRedditResults));
  }
}

function translateRedditResults(
  items: RedditResponse
): ImageMetadata[] {
  // This function doesn't know anything about HTTP or Observable; it just
  // manages the messy shape of this API's data return layout.

  return items.data.children
    .filter(
      (item: RedditResponseChild) =>
        !!item &&
        !!item.data &&
        item.data.thumbnail.startsWith('http')
    )
    .map((item: RedditResponseChild): ImageMetadata => {
      const thumbnail = item.data.thumbnail;
      const title = item.data.title;
      return { thumbnail, title };
    });
}
