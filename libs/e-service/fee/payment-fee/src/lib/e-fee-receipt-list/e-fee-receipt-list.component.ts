import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { column2 } from '@ksp/e-service/fee/refund-fee';
import { LoaderService } from '@ksp/shared/service';
import { ReceiptPreviewComponent } from 'libs/self-service/ui/src/lib/receipt-preview/receipt-preview.component';

@Component({
  selector: 'ksp-e-fee-receipt-list',
  templateUrl: './e-fee-receipt-list.component.html',
  styleUrls: ['./e-fee-receipt-list.component.scss'],
})
export class EFeeReceiptListComponent implements OnInit {
  displayedColumns: string[] = column;
  displayedColumns2: string[] = column2;
  dataSource = new MatTableDataSource<refundConfirmInfo>();

  form = this.fb.group({
    licensetype: [],
    receiptno: [],
    licenseno: [],
    idcardno: [],
    refid: [],
    paymentchannel: [],
    paymentstatus: [],
    paymentdate: [],
  });

  constructor(
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  view() {
    this.dialog.open(ReceiptPreviewComponent, {
      width: '50vw',
    });
  }

  cancel() {
    this.router.navigate(['/', 'payment-fee', 'detail']);
  }

  ngOnInit(): void {
    this.search();
  }
}

interface refundConfirmInfo {
  order: number;
  receiptno: string;
  receiptdate: string;
  requestno: string;
  refid: string;
  paymentchannel: string;
  idcardno: string;
  name: string;
  feetype: string;
  amount: string;
  receiptstatus: string;
  canceldate: string;
}

const data: refundConfirmInfo[] = [
  {
    order: 1,
    receiptno: 'receiptno',
    receiptdate: 'receiptdate',
    requestno: 'requestid',
    refid: 'refid',
    paymentchannel: 'paymentchannel',
    idcardno: 'idcardno',
    name: 'name',
    feetype: 'feetype',
    amount: 'amount',
    receiptstatus: 'receiptstatus',
    canceldate: 'canceldate',
  },
];

const column = [
  'order',
  'receiptno',
  'receiptdate',
  'requestno',
  'refid',
  'paymentchannel',
  'idcardno',
  'name',
  'feetype',
  'amount',
  'receiptstatus',
  'canceldate',
  'receipt',
  'cancel',
];
