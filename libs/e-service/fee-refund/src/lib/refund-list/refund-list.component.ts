import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-refund-list',
  templateUrl: './refund-list.component.html',
  styleUrls: ['./refund-list.component.scss'],
})
export class RefundListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<refundInfo>();

  constructor(private router: Router) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  approve() {
    this.router.navigate(['/refund', 'confirm']);
  }

  verify() {
    this.router.navigate(['/refund', 'detail']);
  }
}

export interface refundInfo {
  order: string;
  ssn: string;
  name: string;
  feeType: string;
  profession: string;
  reason: string;
  process: string;
  status: string;
  submitDate: string;
  approveDate: string;
  refundDate: string;
}

export const data: refundInfo[] = [
  {
    order: 'SF_TR6406000001',
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    feeType: 'ขึ้นทะเบียน',
    profession: 'ครู',
    reason: 'ขอยกเลิกการขึ้นทะเบียนรับใบอนุญาต',
    process: 'ตรวจสอบ',
    status: 'เสร็จสิ้น',
    submitDate: '01 มิ.ย.2564',
    approveDate: '01 มิ.ย.2564',
    refundDate: '01 มิ.ย.2564',
  },
  {
    order: 'SF_TR6406000001',
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    feeType: 'ขึ้นทะเบียน',
    profession: 'ครู',
    reason: 'ขอยกเลิกการขึ้นทะเบียนรับใบอนุญาต',
    process: 'ตรวจสอบ',
    status: 'เสร็จสิ้น',
    submitDate: '01 มิ.ย.2564',
    approveDate: '01 มิ.ย.2564',
    refundDate: '01 มิ.ย.2564',
  },
  {
    order: 'SF_TR6406000001',
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    feeType: 'ขึ้นทะเบียน',
    profession: 'ครู',
    reason: 'ขอยกเลิกการขึ้นทะเบียนรับใบอนุญาต',
    process: 'ตรวจสอบ',
    status: 'เสร็จสิ้น',
    submitDate: '01 มิ.ย.2564',
    approveDate: '01 มิ.ย.2564',
    refundDate: '01 มิ.ย.2564',
  },
  {
    order: 'SF_TR6406000001',
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    feeType: 'ขึ้นทะเบียน',
    profession: 'ครู',
    reason: 'ขอยกเลิกการขึ้นทะเบียนรับใบอนุญาต',
    process: 'ตรวจสอบ',
    status: 'เสร็จสิ้น',
    submitDate: '01 มิ.ย.2564',
    approveDate: '01 มิ.ย.2564',
    refundDate: '01 มิ.ย.2564',
  },
];

export const column = [
  'select',
  'order',
  'ssn',
  'name',
  'feeType',
  'profession',
  'reason',
  'process',
  'status',
  'submitDate',
  'approveDate',
  'refundDate',
  'verify',
  'approve',
];
