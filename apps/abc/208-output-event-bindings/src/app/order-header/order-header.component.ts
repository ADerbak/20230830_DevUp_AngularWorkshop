import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  standalone: true
})
export class OrderHeaderComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('customerName') customer = '';
}
