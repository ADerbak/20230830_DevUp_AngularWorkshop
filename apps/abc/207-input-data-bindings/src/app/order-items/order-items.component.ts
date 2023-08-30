import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Item } from '../api-types';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  standalone: true,
  imports: [NgFor]
})
export class OrderItemsComponent {
  @Input() items: Item[] = [];
}
