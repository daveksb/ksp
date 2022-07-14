import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ksp-self-service-home-page',
  templateUrl: './self-service-home-page.component.html',
  styleUrls: ['./self-service-home-page.component.scss'],
})
export class SelfServiceHomePageComponent {
  /* constructor() {} */

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<PersonLicense>();

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
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
];
