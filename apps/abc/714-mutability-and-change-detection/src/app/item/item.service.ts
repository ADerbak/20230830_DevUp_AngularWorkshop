import { Injectable } from '@angular/core';

import { Item } from './item-types';

// This Data service is intentionally unrealistic; it exposes and
// manipulates the same data in two different ways, so that we can
// experiment with different change detection settings.

// For any real code, please pick one approach - the code will be
// shorter and better.

const DEFAULT_TODO_LIST_ITEMS = [
  'Attach cover letter to TPS report',
  'Double check decimal places',
  'Jump to conclusions'
];

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // Mutate State
  itemList1: Item[] = DEFAULT_TODO_LIST_ITEMS.map(description => ({
    description,
    completed: false
  }));

  // Immutable State
  itemList2: Item[] = DEFAULT_TODO_LIST_ITEMS.map(description => ({
    description,
    completed: false
  }));

  toggleItem(itemIndex: number) {
    // Mutate State
    this.itemList1[itemIndex].completed =
      !this.itemList1[itemIndex].completed;

    // Immutable State
    this.itemList2 = [...this.itemList2];
    this.itemList2[itemIndex] = {
      ...this.itemList2[itemIndex],
      completed: !this.itemList2[itemIndex].completed
    };
  }

  addItem(newItem: Item) {
    // Mutate State
    this.itemList1.unshift({ ...newItem }); // add at the front

    // Immutable State
    this.itemList2 = [{ ...newItem }, ...this.itemList2];
  }
}
