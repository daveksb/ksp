import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ActivatedRoute, Router } from '@angular/router';
import { SelfRequestService } from '@ksp/shared/service';
import { KspRequest } from '@ksp/shared/interface';

@Component({
  selector: 'self-service-print-receipt-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, QRCodeModule, NgxBarcodeModule],
  templateUrl: './print-receipt-dialog.component.html',
  styleUrls: ['./print-receipt-dialog.component.scss'],
})
export class PrintReceiptDialogComponent implements OnInit {
  qrString = '';
  kspRequest: KspRequest = new KspRequest();

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private reqService: SelfRequestService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      this.reqService.getRequestById(Number(res.get('id'))).subscribe((res) => {
        this.kspRequest = res;
        if (res && res.idcardno) {
          this.qrString = res.idcardno + res.requestno;
          //console.log('qr string = ', this.qrString);
        }
      });
    });
  }

  print() {
    window.print();
  }
}
