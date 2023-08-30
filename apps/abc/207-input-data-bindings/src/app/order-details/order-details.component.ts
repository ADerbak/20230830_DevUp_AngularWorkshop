import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Order } from '../api-types';
import { OrderHeaderComponent } from '../order-header/order-header.component';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  standalone: true,
  imports: [NgIf, OrderHeaderComponent, OrderItemsComponent]
})
export class OrderDetailsComponent {
  @Input() details: Order | undefined;
}
