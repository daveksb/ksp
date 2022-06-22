import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReceivePreviewComponent } from '../receive-preview/receive-preview.component';

@Component({
  selector: 'self-service-payment-history-item',
  templateUrl: './payment-history-item.component.html',
  styleUrls: ['./payment-history-item.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class PaymentHistoryItemComponent {
  @Input() name: any;
  @Input() date: any;
  @Input() amount: any;
  @Input() order: any;

  constructor(public dialog: MatDialog) {}

  view() {
    this.dialog.open(ReceivePreviewComponent, {
      width: '600px',
    });
  }
}
