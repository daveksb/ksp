import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'self-service-print-receipt-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './print-receipt-dialog.component.html',
  styleUrls: ['./print-receipt-dialog.component.scss'],
})
export class PrintReceiptDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  print() {
    window.print();
  }
}
