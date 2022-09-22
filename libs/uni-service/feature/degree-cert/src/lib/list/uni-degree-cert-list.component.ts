import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from '@ksp/shared/menu';
import { DegreeCertSearchComponent } from '@ksp/shared/search';
import { UniFormBadgeComponent } from '@ksp/shared/ui';
import { getCookie, stringToThaiDate } from '@ksp/shared/utility';
import { UniDegreeCertListService } from './uni-degree-cert-list.service';

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
    ReactiveFormsModule,
  ],
})
export class UniDegreeCertListComponent implements OnInit {
  displayedColumns: string[] = displayedColumns;
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  form = this.fb.group({
    search: [
      {

      },
    ],
  });
  constructor(
    private uniDegreeCertListService: UniDegreeCertListService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.uniDegreeCertListService
      .universitySelectById(getCookie('uniType'))
      .subscribe((data) => {
        this.form.setValue({
          search: {
            institutionNumber: data?.universitycode,
          },
        });
      });
  }
  getRequest() {
    console.log(this.form.controls.search.value);
    return {
      uniid: '22',
    };
  }
  search() {
    this.uniDegreeCertListService
      .uniRequestDegreeSearch(this.getRequest())
      .subscribe((res) => {
        if (!res?.datareturn) return;
        this.dataSource.data = res?.datareturn?.map(
          (item: any, index: number) => {
            return {
              order: ++index,
              degreeId: item?.requestno,
              data: item?.requestdate,
              uni: item?.uniname,
              major: item?.fulldegreenameth,
              verifyStatus: 'รับข้อมูล',
              considerStatus: 'พิจารณา',
              approveStatus: 'พิจารณา',
              approveDate: '30 ส.ค. 2564',
              editDate: stringToThaiDate(item?.updatedate),
              verify: 'แก้ไข',
              consider: 'แก้ไข',
            };
          }
        );
      });
  }
  onEdit(rowData: any) {
    console.log(rowData);
  }
  onPrint(rowData: any) {
    console.log(rowData);
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
