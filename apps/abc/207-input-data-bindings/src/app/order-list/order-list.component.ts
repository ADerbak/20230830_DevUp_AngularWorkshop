import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Order } from '../api-types';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  standalone: true,
  imports: [NgFor]
})
export class OrderListComponent {
  // defaults to property name = variable name.
  // can override, @Input('name')
  @Input() orders: Order[] = [];
}
