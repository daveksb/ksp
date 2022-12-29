import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from '@ksp/shared/service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-fee-all-fee-payment',
  templateUrl: './e-fee-all-fee-payment.component.html',
  styleUrls: ['./e-fee-all-fee-payment.component.scss'],
})
export class EFeeAllFeePaymentComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  displayedColumns2: string[] = column2;
  dataSource = new MatTableDataSource<refundConfirmInfo>();
  dataSource2 = new MatTableDataSource<productInfo>();

  form = this.fb.group({
    licensetype: [],
    licenseno: [],
    idcardno: [],
    refid: [],
    paymentchannel: [],
    paymentstatus: [],
    paymentdate: [],
  });

  constructor(private fb: FormBuilder, private loaderService: LoaderService) {}

  search() {
    this.dataSource.data = data;
    this.dataSource2.data = data2;
  }

  clear() {
    this.dataSource.data = [];
    this.dataSource2.data = [];
  }

  ngOnInit(): void {
    this.search();
  }
}

interface refundConfirmInfo {
  order: number;
  requestno: string;
  refid: string;
  paymentchannel: string;
  idcardno: string;
  name: string;
  licensetype: string;
  amount: string;
  status: string;
  remark: string;
  paydate: string;
  requestdate: string;
  successdate: string;
}

interface productInfo {
  productid: string;
  feetype: string;
  feerate: string;
  quantity: string;
  feeamount: string;
  remark: string;
}

const data: refundConfirmInfo[] = [
  {
    order: 1,
    requestno: 'requestno',
    refid: 'refid',
    paymentchannel: 'paymentchannel',
    idcardno: 'idcardno',
    name: 'name',
    licensetype: 'licensetype',
    amount: 'amount',
    status: 'status',
    remark: 'remark',
    paydate: 'paydate',
    requestdate: 'requestdate',
    successdate: 'successdate',
  },
];

const data2: productInfo[] = [
  {
    productid: 'productid',
    feetype: 'feetype',
    feerate: 'feerate',
    quantity: 'quantity',
    feeamount: 'feeamount',
    remark: 'remark',
  },
];

const column = [
  'order',
  'requestno',
  'refid',
  'paymentchannel',
  'idcardno',
  'name',
  'licensetype',
  'amount',
  'status',
  'remark',
  'paydate',
  'requestdate',
  'successdate',
  'manualapprove',
];

const column2 = [
  'productid',
  'feetype',
  'feerate',
  'quantity',
  'feeamount',
  'remark',
];
