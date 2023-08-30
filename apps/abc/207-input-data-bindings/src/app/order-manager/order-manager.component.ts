import { Component } from '@angular/core';

import { Order, mockApiOrders } from '../api-types';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  standalone: true,
  imports: [OrderListComponent, OrderDetailsComponent]
})
export class OrderManagerComponent {
  orderList: Order[] = mockApiOrders;
  selectedOrder: Order | undefined;

  choose(i: number) {
    this.selectedOrder = this.orderList[i];
  }
}
