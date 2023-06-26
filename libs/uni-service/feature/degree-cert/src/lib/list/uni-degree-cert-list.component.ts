import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { EUniApproveProcess } from '@ksp/shared/constant';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import { TopNavComponent } from '@ksp/shared/menu';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { DegreeCertSearchComponent } from '@ksp/shared/search';
import { LoaderService, UniInfoService } from '@ksp/shared/service';
import {
  DegreeCertStatusComponent,
  UniFormBadgeComponent,
} from '@ksp/shared/ui';
import { formatRequestNo, getCookie, parseJson, stringToThaiDate, thaiDate } from '@ksp/shared/utility';
import _ from 'lodash';
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
    MatProgressSpinnerModule,
  ],
})
export class UniDegreeCertListComponent
  extends KspPaginationComponent
  implements OnInit
{
  displayedColumns: string[] = displayedColumns;
  badgeTitle1: any;
  badgeTitle2: any;
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  form = this.fb.group({
    search: [{}],
  });
  uniUniversityOption: ListData[] = [];
  degreeLevelOption: ListData[] = [];
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  verifyStatusOption: ListData[] = EUniApproveProcess.map(
    ({ processId, processName }) => ({ value: processId, label: processName })
  );
  approveStatusOption: ListData[] = [];
  rejectedRequests: any = [];

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
  changeStatus(event: any) {
    const options = _.find(EUniApproveProcess, {
      processId: _.toNumber(event),
    });
    this.approveStatusOption = (options?.status || []).map(({ id, sname }) => ({
      value: id,
      label: sname,
    }));
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
    let requestno = '';
    if (licenseNumber) {
      requestno = licenseNumber.replaceAll('-', ''); 
    }
    return {
      unicode: institutionNumber || '',
      uniid: institutionName || '',
      fulldegreenameth: degreeName || '',
      requestno: requestno,
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
              degreeId: formatRequestNo(item?.requestno),
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
              detail: item?.detail ? JSON.parse(item?.detail) : {},
              requestno: item?.requestno
            };
          }
        );
        this.rejectedRequests = this.dataSource.data.filter((data: any) => {
          return (data.process == '1' && data.status == '2') || 
                  (data.process == '3' && data.status == '2') ||
                  (data.process == '4' && data.status == '3') ||
                  (data.process == '5' && data.status == '3');
        })
      });
  }

  genAlertMessage(req: any) {
    return `แจ้งเตือน เลขที่คำขอ: ${formatRequestNo(req.requestno)} รายการขอรับรองปริญญาและประกาศนียบัตรทางการศึกษา ถูกส่งคืน "ปรับแก้ไข/เพิ่มเติม"`;
  }

  genSubTitle(req: any) {
    const detail: any = req.detail;
    return ` กรุณาส่งกลับภายในวันที่ ${detail.returnDate ? thaiDate(
      new Date(detail.returnDate)
    ) : ''} มิฉะนั้นแบบคำขอจะถูกยกเลิก `;
  }

  goToDetail(req: any) {
    this.router.navigate(['/degree-cert', 'request'], {
      queryParams: {
        id: req?.key,
      },
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
    this.form.setValue({
      search: {
        institutionName: getCookie('uniId'),
      },
    });
  }
  async getAll() {
    let resData = await lastValueFrom(
      this.uniInfoService.univerSitySelectById(getCookie('uniId'))
    );
    const degreeLevel = await lastValueFrom(
      this.uniInfoService.uniDegreeLevel().pipe(
        map((data) => {
          return data.map(({ id, name }: any) => ({
            value: id,
            label: name,
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
  // 'considerStatus',
  // 'approveStatus',
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
