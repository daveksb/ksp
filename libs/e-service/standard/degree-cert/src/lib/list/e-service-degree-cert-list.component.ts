import { EUniService } from '@ksp/shared/service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import { UniInfoService } from '@ksp/shared/service';
import { map } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { thaiDate } from '@ksp/shared/utility';
import { EUniApproveProcess } from '@ksp/shared/constant';
import _ from 'lodash';
import moment from 'moment';
@Component({
  selector: 'e-service-degree-cert-list',
  templateUrl: './e-service-degree-cert-list.component.html',
  styleUrls: ['./e-service-degree-cert-list.component.scss'],
})
export class EServiceDegreeCertListComponent
  extends KspPaginationComponent
  implements OnInit
{
  showActionButtons = false;
  data: DegreeCertInfo[] = [data];
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  selection = new SelectionModel<DegreeCertInfo>(true, []);
  displayedColumns: string[] = displayedColumns;
  pageType = 0;
  showColumnSelect = false;
  uniUniversityOption: ListData[] = [];
  degreeLevelOption: ListData[] = [];
  verifyStatusOption: ListData[] = EUniApproveProcess.map(
    ({ processId, processName }) => ({ value: processId, label: processName })
  );
  approveStatusOption: ListData[] = [];
  form = this.fb.group({
    search: [{}],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uniInfoService: UniInfoService,
    private eUiService: EUniService
  ) {
    super();
    this.getOptions();
  }
  getOptions() {
    this.uniInfoService
      .getUniuniversity()
      .pipe(
        map((res) => {
          return res?.datareturn?.map(({ id, name }: any) => ({
            value: id,
            label: name,
          }));
        })
      )
      .subscribe((data) => {
        this.uniUniversityOption = data;
      });

    this.uniInfoService
      .getUniDegreelevel()
      .pipe(
        map((res) => {
          return res?.datareturn?.map(({ id, name }: any) => ({
            value: id,
            label: name,
          }));
        })
      )
      .subscribe((data) => {
        this.degreeLevelOption = data;
      });
  }
  ngOnInit() {
    this.form.controls.search.valueChanges.subscribe((data: any) => {
      if (data?.verifyStatus) {
        const options = _.find(EUniApproveProcess, {
          processId: _.toNumber(data?.verifyStatus),
        });
        this.approveStatusOption = (options?.status || []).map(
          ({ id, sname }) => ({
            value: id,
            label: sname,
          })
        );
      }
    });
    this.route.paramMap.subscribe((res) => {
      if (res) {
        /**
         * show action buttons if process = consider || approve
         */
        this.showActionButtons = [3, 4, 5].includes(Number(res.get('type')));
        this.showColumnSelect =
          Number(res.get('type')) == 1 || !res.get('type');
      }
      this.pageType = Number(res.get('processId'));

      console.log('page type = ', this.pageType);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
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
      requestdate: date ? moment(date).format('YYYY-MM-DD') : '',
      coursestatus: courseStatus || '',
      degreelevel: submitDegreeLevel || '',
      requeststatus: approveStatus || '',
      requestprocess: verifyStatus || '',
      ...this.tableRecord,
    };
  }
  override search() {
    this.eUiService
      .uniRequestDegreeCertSearchEsUni(this.getRequest())
      .subscribe((res) => {
        if (!res?.datareturn) return;
        this.pageEvent.length = res.countrow;
        this.dataSource.data = res?.datareturn?.map(
          (item: any, index: number) => {
            return {
              key: item?.id,
              order:
                this.pageEvent.pageIndex * this.pageEvent.pageSize + ++index,
              // degreeId: item?.requestno,
              requestno: item?.requestno,
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
                ? thaiDate(new Date(item?.requestdate))
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

  onClear() {
    this.form.reset();
    this.dataSource.data = [];
  }

  consider() {
    this.router.navigate(['/degree-cert', 'verify', 1, 3], {
      state: {
        dataSource: this.selection.selected,
      },
    });
  }

  approve() {
    this.router.navigate(['/degree-cert', 'verify', 2, 3], {
      state: {
        dataSource: this.selection.selected,
      },
    });
  }
  isSelectConsider() {
    return this.selection.selected.length > 0;
  }

  isSelectApprove() {
    return this.selection.selected.length > 0;
  }
  goToDetailPage(row: any) {
    if (this.pageType === 0) {
      this.router.navigate(['/degree-cert', 'check', row?.key]);
    } else if (this.pageType === 1) {
      this.router.navigate(['/degree-cert', 'consider', row?.key]);
    } else if (this.pageType === 2) {
      this.router.navigate(['/degree-cert', 'approve', row?.key]);
    }
  }

  lastStep(row: any) {
    this.router.navigate(['/degree-cert', 'final-result', row?.key]);
  }
  isSelect(row: any) {
    if (this.pageType === 1) {
      return row?.process == '3';
    }
    return true;
  }
}

const displayedColumns: string[] = [
  'select',
  // 'degreeId',
  'requestno',
  'date',
  'uni',
  'major',
  'verifyStatus',
  'considerStatus',
  'approveStatus',
  'editDate',
  'verify',
  'consider',
  'print',
];
export interface DegreeCertInfo {
  // degreeId: string;
  key?: any;
  requestno?: any;
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

export const data: DegreeCertInfo = {
  // degreeId: 'UNI_VC_64120009',
  date: '10 ธ.ค. 2564',
  uni: 'มหาวิทยาลัยภูเก็ต',
  major: 'คุรุศาสตร์',
  verifyStatus: 'รับข้อมูล',
  considerStatus: 'พิจารณา',
  approveStatus: 'พิจารณา',
  approveDate: '30 ส.ค. 2564',
  editDate: '30 ส.ค. 2564',
  verify: 'ตรวจสอบแล้ว',
  consider: 'ตรวจสอบแล้ว',
};
