import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface TempLicenseInfo {
  order: number;
  reqCode: string;
  ssn: string;
  name: string;
  professType: string;
  workStep: string;
  status: number;
  editDate: string;
  sendDate: string;
  requestDoc: string;
  approveDoc: string;
}

export const data: TempLicenseInfo[] = [
  {
    order: 1,
    reqCode: 'SF_TR6406000001',
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    professType: 'หนังสืออนุญาตชั่วคราว-ครู',
    workStep: 'ตรวจสอบเอกสาร (2)',
    status: 1, //'ผ่านการตรวจสอบ',
    editDate: '10 พ.ค. 2564',
    sendDate: '1 พ.ค. 2564',
    requestDoc: '',
    approveDoc: '',
  },
  {
    order: 2,
    reqCode: 'SF_TR6406000001',
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    professType: 'หนังสืออนุญาตชั่วคราว-ครู',
    workStep: 'ตรวจสอบเอกสาร (2)',
    status: 2, //'ปรับแก้ไข/เพิ่มเติม',
    editDate: '10 พ.ค. 2564',
    sendDate: '1 พ.ค. 2564',
    requestDoc: '',
    approveDoc: '',
  },
];
@Component({
  selector: 'school-service-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.scss'],
})
export class LicenseListComponent {
  @Input() isStatusValid = false;

  personSelected = false;
  displayedColumns: string[] = [
    'order',
    'reqCode',
    'ssn',
    'name',
    'professType',
    'workStep',
    'status',
    'editDate',
    'sendDate',
    'requestDoc',
    'approveDoc',
  ];
  dataSource = new MatTableDataSource<TempLicenseInfo>();

  constructor(private router: Router) {}
  data: TempLicenseInfo[] = [];

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  nextPage(requestType: number) {
    this.router.navigate(['/', 'temp-license', 'detail'], {
      queryParams: { type: requestType },
    });
  }

  nextPage2() {
    this.router.navigate(['/', 'temp-license', 'foreign']);
  }
}
