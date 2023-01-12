import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ksp-temp-license-report',
  templateUrl: './temp-license-report.component.html',
  styleUrls: ['./temp-license-report.component.scss'],
})
export class TempLicenseReportComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<refundConfirmInfo>();

  constructor() {}

  ngOnInit(): void {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }
}

interface refundConfirmInfo {
  order: string;
  receiptno: string;
  refid: string;
  idcardno: string;
  name: string;
  feetype: string;
  amount: string;
}

const data: refundConfirmInfo[] = [
  {
    order: '-',
    receiptno: '-',
    refid: '-',
    idcardno: '-',
    name: '-',
    feetype: '-',
    amount: '-',
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
