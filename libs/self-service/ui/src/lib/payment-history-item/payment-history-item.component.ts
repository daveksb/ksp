import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReceivePreviewComponent } from '@ksp/self-service/ui';

@Component({
  selector: 'self-service-payment-history-item',
  templateUrl: './payment-history-item.component.html',
  styleUrls: ['./payment-history-item.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class PaymentHistoryItemComponent {
  constructor(public dialog: MatDialog) {}

  view() {
    this.dialog.open(ReceivePreviewComponent, {
      width: '600px',
    });
  }
}
