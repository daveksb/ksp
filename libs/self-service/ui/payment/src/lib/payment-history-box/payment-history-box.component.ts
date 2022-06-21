import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewReceiveComponent } from '../view-receive/view-receive.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ksp-payment-history-box',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './payment-history-box.component.html',
  styleUrls: ['./payment-history-box.component.scss'],
})
export class PaymentHistoryBoxComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  view() {
    this.dialog.open(ViewReceiveComponent, {
      width: '600px',
    });
  }
}
