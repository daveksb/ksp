import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteDialogComponent } from '@ksp/shared/dialog';
import { thaiDate } from '@ksp/shared/utility';
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
    this.router.navigate(['/', 'license', 'payment-promptpay', type]);
  }
}
