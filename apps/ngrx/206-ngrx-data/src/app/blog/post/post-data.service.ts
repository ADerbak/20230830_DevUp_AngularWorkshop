import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Post } from '../types';

@Injectable({ providedIn: 'root' })
export class PostDataService extends EntityCollectionServiceBase<Post> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Post', serviceElementsFactory);
    // initialize the data
    this.load();
  }
}
