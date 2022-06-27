import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  templateUrl: './school-temp-license-list.component.html',
  styleUrls: ['./school-temp-license-list.component.scss'],
})
export class SchoolTempLicenseListComponent {
  form = this.fb.group({
    licenseNumber: [],
    personId: [],
    profession: [],
    process: [],
    status: [],
    submitDateFrom: [],
    submitDateTo: [],
  });

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

  constructor(private router: Router, private fb: FormBuilder) {}
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
    this.router.navigate(['/', 'foreign-id']);
  }
}

export interface TempLicenseInfo {
  order: number;
  reqCode: string;
  ssn: string;
  name: string;
  professType: string;
  workStep: string;
  status: string;
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
    status: 'ผ่านการตรวจสอบ',
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
    status: 'ปรับแก้ไข/เพิ่มเติม',
    editDate: '10 พ.ค. 2564',
    sendDate: '1 พ.ค. 2564',
    requestDoc: '',
    approveDoc: '',
  },
];
