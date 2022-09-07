import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-self-service-home-page',
  templateUrl: './self-service-home-page.component.html',
  styleUrls: ['./self-service-home-page.component.scss'],
})
export class SelfServiceHomePageComponent {
  constructor(private router: Router) {}

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<PersonLicense>();

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  thaiTeacher() {
    this.router.navigate(['/', 'license', 'teacher']);
  }

  foreignTeacher() {
    this.router.navigate(['/', 'license', 'agreement']);
  }

  schoolManager() {
    this.router.navigate(['/', 'license', 'school-manager']);
  }

  educationManager() {
    this.router.navigate(['/', 'license', 'education-manager']);
  }

  studySupervision() {
    this.router.navigate(['/', 'license', 'study-supervision']);
  }

  teacherRenew() {
    this.router.navigate(['/', 'renew-license', 'request']);
  }

  /* xxx() {
    this.router.navigate(['/', 'reward', 'detail']);
  } */

  rewardPage(requestType: number) {
    this.router.navigate(['/', 'reward', 'request'], {
      queryParams: { type: requestType },
    });
  }

  /* reward1() {
    this.router.navigate(['/', 'reward', 'council']);
  }

  reward2() {
    this.router.navigate(['/', 'reward', 'thai-teacher']);
  }

  reward3() {
    this.router.navigate(['/', 'reward', 'best-teacher']);
  }

  reward4() {
    this.router.navigate(['/', 'reward', 'praise-teacher']);
  }

  reward5() {
    this.router.navigate(['/', 'reward', 'senior-teacher']);
  }

  reward6() {
    this.router.navigate(['/', 'reward', 'research']);
  } */

  refundFee() {
    this.router.navigate(['/', 'refund-fee', 'request']);
  }

  substituteLicense() {
    this.router.navigate(['/', 'substitute-license', 'request']);
  }
}

export const column = [
  'order',
  'licenseNumber',
  'submitDate',
  'name',
  'paymentStatus',
  'listStatus',
  'process',
  'edit',
  'print',
];

export interface PersonLicense {
  order: number;
  licenseNumber: string;
  submitDate: string;
  name: string;
  paymentStatus: string;
  listStatus: string;
  process: string;
}

export const data: PersonLicense[] = [
  {
    order: 1,
    licenseNumber: '110200051214',
    submitDate: '10/10/2022',
    name: 'พรทิพย์ นาคปรก',
    paymentStatus: 'รอชำระ',
    listStatus: 'ผ่าน',
    process: 'พิมพ์ในอนุณาต',
  },
  {
    order: 2,
    licenseNumber: '110200051214',
    submitDate: '10/10/2022',
    name: 'พรทิพย์ นาคปรก',
    paymentStatus: 'ชำระแล้ว',
    listStatus: 'ขอเอกสารเพิ่มเติม',
    process: 'ส่งตรวจสอบ',
  },
  {
    order: 3,
    licenseNumber: '110200051214',
    submitDate: '10/10/2022',
    name: 'พรทิพย์ นาคปรก',
    paymentStatus: 'ชำระแล้ว',
    listStatus: 'ขอเอกสารเพิ่มเติม',
    process: 'ส่งตรวจสอบ',
  },
  {
    order: 4,
    licenseNumber: '110200051214',
    submitDate: '10/10/2022',
    name: 'พรทิพย์ นาคปรก',
    paymentStatus: 'ชำระแล้ว',
    listStatus: 'ขอเอกสารเพิ่มเติม',
    process: 'ส่งตรวจสอบ',
  },
  {
    order: 5,
    licenseNumber: '110200051214',
    submitDate: '10/10/2022',
    name: 'พรทิพย์ นาคปรก',
    paymentStatus: 'ชำระแล้ว',
    listStatus: 'ขอเอกสารเพิ่มเติม',
    process: 'ส่งตรวจสอบ',
  },
];
