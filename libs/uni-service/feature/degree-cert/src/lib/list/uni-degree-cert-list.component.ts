import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import { TopNavComponent } from '@ksp/shared/menu';
import { DegreeCertSearchComponent } from '@ksp/shared/search';
import { UniInfoService } from '@ksp/shared/service';
import { UniFormBadgeComponent } from '@ksp/shared/ui';
import { getCookie, stringToThaiDate } from '@ksp/shared/utility';
import { lastValueFrom, map } from 'rxjs';

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
    MatPaginatorModule,
  ],
})
export class UniDegreeCertListComponent
  extends KspPaginationComponent
  implements OnInit
{
  displayedColumns: string[] = displayedColumns;

  dataSource = new MatTableDataSource<DegreeCertInfo>();
  form = this.fb.group({
    search: [{}],
  });
  uniUniversityOption: ListData[] = [];

  constructor(
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.getAll();
  }
  getRequest() {
    const {
      institutionNumber,
      licenseNumber,
      degreeName,
      date,
      submitDegreeLevel,
      courseStatus,
      verifyStatus,
      approveStatus,
    } = this.form.controls.search.value as any;
    return {
      uniid: institutionNumber || '',
      fulldegreenameth: degreeName || '',
      requestno: licenseNumber || '',
      requestdate: date || '',
      coursestatus: courseStatus || '',
      degreelevel: submitDegreeLevel || '',
      requeststatus: approveStatus || '',
      requestprocess: verifyStatus || '',
      ...this.tableRecord,
    };
  }
  override search() {
    this.uniInfoService
      .uniRequestDegreeSearch(this.getRequest())
      .subscribe((res) => {
        if (!res?.datareturn) return;
        this.pageEvent.length = res.countrow;
        this.dataSource.data = res?.datareturn?.map(
          (item: any, index: number) => {
            return {
              key: item?.id,
              order: this.pageEvent.pageIndex * this.pageEvent.pageSize + ++index,
              degreeId: item?.requestno,
              data: item?.requestdate,
              uni: item?.uniname,
              major: item?.fulldegreenameth,
              verifyStatus: 'รับข้อมูล',
              considerStatus: 'พิจารณา',
              approveStatus: 'พิจารณา',
              approveDate: item?.requestdate
                ? stringToThaiDate(item?.requestdate)
                : '',
              editDate: item?.updatedate
                ? stringToThaiDate(item?.updatedate)
                : '',
              verify: 'แก้ไข',
              consider: 'แก้ไข',
            };
          }
        );
      });
  }
  onEdit(rowData: any) {
    this.router.navigate(['/degree-cert', 'request'], {
      queryParams: {
        id: rowData?.key,
      },
    });
  }
  onPrint(rowData: any) {
    console.log(rowData);
  }
  clear() {
    this.dataSource.data = [];
  }
  async getAll() {
    let resData = await lastValueFrom(
      this.uniInfoService.univerSitySelectById(getCookie('uniType'))
    );
    this.form.setValue({
      search: {
        institutionNumber: getCookie('uniId'),
        institutionName: getCookie('uniType'),
      },
    });
    resData = await lastValueFrom(
      this.uniInfoService.searchTypeidUniUniversity(resData.typeid).pipe(
        map((data) => {
          return data.map(({ id, name }: any) => ({ value: id, label: name }));
        })
      )
    );
    this.uniUniversityOption = resData;
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
