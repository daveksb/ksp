import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './payment-channel.component.html',
  styleUrls: ['./payment-channel.component.css'],
})
export class PaymentChannelComponent {
  constructor(public router: Router) {}

  promptpay(type: any) {
    this.router.navigate(['/', 'license', 'payment-promptpay', type]);
  }
}
