import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelfServiceRequestType } from '@ksp/shared/constant';
import { ESelfSearchPayload, SelfRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-refund-list',
  templateUrl: './refund-list.component.html',
  styleUrls: ['./refund-list.component.scss'],
})
export class RefundListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();

  constructor(
    private router: Router,
    private requestService: ERequestService
  ) {}

  search() {
    // this.dataSource.data = data;
    const payload: ESelfSearchPayload = {
      systemtype: 1, // self service
      requesttype: +SelfServiceRequestType.ขอคืนเงินค่าธรรมเนียม, // ใบคำขอต่อใบอนุญาต
      requestno: '',
      firstnameth: '',
      idcardno: '',
      currentprocess: '',
      requestdate: '',
      offset: '0',
      row: '1000',
    };
    this.requestService.searchSelfRequest(payload).subscribe((res) => {
      console.log(res);
      this.dataSource.data = res;
      // this.dataSource.data = res;
      // this.dataSource.sort = this.sort;

      // const sortState: Sort = { active: 'id', direction: 'desc' };
      // this.sort.active = sortState.active;
      // this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);
    });
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
