import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-fee-receive-fee-list',
  templateUrl: './e-fee-receive-fee-list.component.html',
  styleUrls: ['./e-fee-receive-fee-list.component.scss'],
})
export class EFeeReceiveFeeListComponent implements OnInit {
  displayedColumns: string[] = column;
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
  refid: string;
  idcardno: string;
  name: string;
  feetype: string;
  amount: string;
}

const data: refundConfirmInfo[] = [
  {
    order: 1,
    receiptno: 'receiptno',
    refid: 'refid',
    idcardno: 'idcardno',
    name: 'name',
    feetype: 'feetype',
    amount: 'amount',
  },
];

const column = [
  'order',
  'name',
  'idcardno',
  'refid',
  'receiptno',
  'amount',
  'feetype',
];
