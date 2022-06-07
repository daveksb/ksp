import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewReceiveComponent } from '@ksp/self-service/ui/payment';

@Component({
  selector: 'self-service-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
})
export class PaymentHistoryComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  view() {
    this.dialog.open(ViewReceiveComponent, {
      width: '600px',
    });
  }
}
