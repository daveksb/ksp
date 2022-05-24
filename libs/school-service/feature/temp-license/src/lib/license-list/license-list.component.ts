import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  {
    order: 3,
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
    order: 4,
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
@Component({
  selector: 'school-service-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.scss'],
})
export class LicenseListComponent {
  constructor(private router: Router) {}
  data: TempLicenseInfo[] = [];

  search() {
    this.data = data;
  }

  clear() {
    this.data = [];
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
