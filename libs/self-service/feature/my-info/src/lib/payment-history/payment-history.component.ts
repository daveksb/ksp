import { Component } from '@angular/core';

@Component({
  selector: 'self-service-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
})
export class PaymentHistoryComponent {
  searchFound = false;

  search() {
    this.searchFound = true;
  }
}
