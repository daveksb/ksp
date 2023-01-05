import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import { TopNavComponent } from '@ksp/shared/menu';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { DegreeCertSearchComponent } from '@ksp/shared/search';
import { LoaderService, UniInfoService } from '@ksp/shared/service';
import {
  DegreeCertStatusComponent,
  UniFormBadgeComponent,
} from '@ksp/shared/ui';
import { getCookie, stringToThaiDate, thaiDate } from '@ksp/shared/utility';
import moment from 'moment';
import { lastValueFrom, map, Subject } from 'rxjs';

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
    ThaiDatePipe,
    DegreeCertStatusComponent,
    MatProgressSpinnerModule
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
  degreeLevelOption: ListData[] = [];
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    super();
  }
  ngOnInit(): void {
    this.getAll();
  }
  getRequest() {
    const {
      institutionName,
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
      unicode: institutionNumber || '',
      uniid: institutionName || '',
      fulldegreenameth: degreeName || '',
      requestno: licenseNumber || '',
      requestdate: date ? moment(date).format('YYYY-MM-DD') : '',
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
              order:
                this.pageEvent.pageIndex * this.pageEvent.pageSize + ++index,
              degreeId: item?.requestno,
              date: item?.requestdate
                ? thaiDate(new Date(item?.requestdate))
                : '',
              uni: item?.uniname,
              major: item?.fulldegreenameth,
              verifyStatus: 'รับข้อมูล',
              considerStatus: 'พิจารณา',
              approveStatus: 'พิจารณา',
              approveDate: '',
              editDate: item?.updatedate
                ? stringToThaiDate(item?.updatedate)
                : '',
              verify: 'แก้ไข',
              consider: 'แก้ไข',
              process: item?.process,
              requestType: item?.requesttype,
              status: item?.status,
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
    this.form.reset();
    this.clearPageEvent();
    this.dataSource.data = [];
  }
  async getAll() {
    let resData = await lastValueFrom(
      this.uniInfoService.univerSitySelectById(getCookie('uniId'))
    );
    const degreeLevel = await lastValueFrom(
      this.uniInfoService.uniDegreeLevel().pipe(
        map((data) => {
          return data.map(({ id, name, campusname }: any) => ({
            value: id,
            label: name + (campusname ? `, ${campusname}` : ''),
          }));
        })
      )
    );
    this.form.setValue({
      search: {
        institutionName: getCookie('uniId'),
      },
    });
    resData = await lastValueFrom(
      this.uniInfoService.searchTypeidUniUniversity(resData.typeid).pipe(
        map((data) => {
          return data.map(({ id, name, campusname }: any) => ({
            value: id,
            label: name + (campusname ? `, ${campusname}` : ''),
          }));
        })
      )
    );
    this.uniUniversityOption = resData;
    this.degreeLevelOption = degreeLevel;
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

/* export const data: DegreeCertInfo[] = [
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
]; */
