import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-foreign-license-list',
  templateUrl: './foreign-license-list.component.html',
  styleUrls: ['./foreign-license-list.component.scss'],
})
export class ForeignLicenseListComponent {
  form = this.fb.group({
    affiliation: [],
    institutionCode: [],
    institutionName: [],
    requestNumber: [],
    name: [],
    submitReqDate: [],
    status: [],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<ForeignLicenseInfo>();
  constructor(private router: Router, private fb: FormBuilder) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  nextPage(requestType: number) {
    this.router.navigate(['/', 'foreign-license', 'detail'], {
      queryParams: { type: requestType },
    });
  }
}

export interface ForeignLicenseInfo {
  order: number;
  reqCode: string;
  ssn: string;
  name: string;
  professType: string;
  workStep: string;
  status: string;
  editDate: string;
  sendDate: string;
}

export const data: ForeignLicenseInfo[] = [
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
  },
];

export const column = [
  'order',
  'reqCode',
  'ssn',
  'name',
  'professType',
  'workStep',
  'status',
  'editDate',
  'sendDate',
  'view',
];
