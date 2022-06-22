import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ViewReceiveComponent } from '../view-receive/view-receive.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ksp-payment-history-box',
  templateUrl: './payment-history-box.component.html',
  styleUrls: ['./payment-history-box.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class PaymentHistoryBoxComponent {
  constructor(public dialog: MatDialog) {}

  view() {
    this.dialog.open(ViewReceiveComponent, {
      width: '600px',
    });
  }
}
