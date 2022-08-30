import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from '@ksp/shared/menu';
import { DegreeCertSearchComponent } from '@ksp/shared/search';
import { UniFormBadgeComponent } from '@ksp/shared/ui';

@Component({
  templateUrl: './uni-degree-cert-list.component.html',
  styleUrls: ['./uni-degree-cert-list.component.scss'],
  standalone: true,
  imports: [
    TopNavComponent,
    DegreeCertSearchComponent,
    RouterModule,
    MatTableModule,
    CommonModule,
    UniFormBadgeComponent,
  ],
})
export class UniDegreeCertListComponent {
  displayedColumns: string[] = displayedColumns;
  dataSource = new MatTableDataSource<DegreeCertInfo>();

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }
}

const displayedColumns: string[] = [
  'order',
  'degreeId',
  'date',
  'uni',
  'major',
  'verifyStatus',
  'considerStatus',
  'approveStatus',
  'approveDate',
  'editDate',
  'verify',
  'consider',
  'edit',
  'print',
];

export interface DegreeCertInfo {
  order: number;
  degreeId: string;
  date: string;
  uni: string;
  major: string;
  verifyStatus: string;
  considerStatus: string;
  approveStatus: string;
  approveDate: string;
  editDate: string;
  verify: string;
  consider: string;
}

export const data: DegreeCertInfo[] = [
  {
    order: 1,
    degreeId: 'UNI_VC_64120009',
    date: '10 ธ.ค. 2564',
    uni: 'มหาวิทยาลัยภูเก็ต',
    major: 'คุรุศาสตร์',
    verifyStatus: 'รับข้อมูล',
    considerStatus: 'พิจารณา',
    approveStatus: 'พิจารณา',
    approveDate: '30 ส.ค. 2564',
    editDate: '30 ส.ค. 2564',
    verify: 'แก้ไข',
    consider: 'แก้ไข',
  },
  {
    order: 2,
    degreeId: 'UNI_VC_64120009',
    date: '10 ธ.ค. 2564',
    uni: 'มหาวิทยาลัยภูเก็ต',
    major: 'คุรุศาสตร์',
    verifyStatus: 'รับข้อมูล',
    considerStatus: 'พิจารณา',
    approveStatus: 'พิจารณา',
    approveDate: '30 ส.ค. 2564',
    editDate: '30 ส.ค. 2564',
    verify: 'ตรวจสอบแล้ว',
    consider: 'แก้ไข',
  },
  {
    order: 3,
    degreeId: 'UNI_VC_64120009',
    date: '10 ธ.ค. 2564',
    uni: 'มหาวิทยาลัยภูเก็ต',
    major: 'คุรุศาสตร์',
    verifyStatus: 'รับข้อมูล',
    considerStatus: 'พิจารณา',
    approveStatus: 'พิจารณา',
    approveDate: '30 ส.ค. 2564',
    editDate: '30 ส.ค. 2564',
    verify: 'ปรับแก้ไข/เพิ่มเติม',
    consider: 'ตรวจสอบแล้ว',
  },
];
