import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import localForage from 'localforage';

@Component({
  templateUrl: './payment-channel.component.html',
  styleUrls: ['./payment-channel.component.css'],
})
export class PaymentChannelComponent implements OnInit {
  requestno!: string;
  requestdate!: string;

  constructor(public router: Router) {}

  ngOnInit(): void {
    localForage.getItem('requestno').then((res: any) => {
      //console.log('xxx = ', res);
      this.requestno = res.requestno;
    });
  }

  promptpay(type: any) {
    this.router.navigate(['/license', 'payment-promptpay', type]);
  }
}
