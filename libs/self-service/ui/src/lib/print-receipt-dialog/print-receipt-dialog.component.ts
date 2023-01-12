import { Component, Inject, Optional } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ThaiDatePipe } from '@ksp/shared/pipe';

@Component({
  selector: 'self-service-print-receipt-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    QRCodeModule,
    NgxBarcodeModule,
    ThaiDatePipe,
  ],
  templateUrl: './print-receipt-dialog.component.html',
  styleUrls: ['./print-receipt-dialog.component.scss'],
})
export class PrintReceiptDialogComponent {
  constructor(
    //private route: ActivatedRoute,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  print() {
    window.print();
  }
}
