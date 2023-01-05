import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { EUniService, LoaderService, UniInfoService } from '@ksp/shared/service';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import { map, Subject } from 'rxjs';
import _ from 'lodash';
import { HistoryRequestAdmissionDialogComponent } from '@ksp/uni-service/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { UniAdmissionStatus } from '@ksp/shared/constant';
import { thaiDate } from '@ksp/shared/utility';

const mapOption = () =>
  map((data: any) => {
    return (
      data?.map((data: any) => ({
        label: _.get(data, 'name'),
        value: _.get(data, 'id'),
      })) || []
    );
  });
@Component({
  selector: 'e-service-degree-cert-list-approved',
  templateUrl: './e-service-degree-cert-list-approved.component.html',
  styleUrls: ['./e-service-degree-cert-list-approved.component.scss'],
})
export class EServiceDegreeCertApprovedListComponent extends KspPaginationComponent implements OnInit {
  showActionButtons = false;
  data: DegreeCertInfo[] = [data];
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  selection = new SelectionModel<DegreeCertInfo>(true, []);
  displayedColumns: string[] = displayedColumns;
  pageType = 0;
  uniUniversityOption: ListData[] = [];
  degreeLevelOptions: ListData[] = [];
  statusList = UniAdmissionStatus;
  form = this.fb.group({
    search: [{}],
  });
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private requestService: EUniService,
    private uniInfoService: UniInfoService,
    public dialog: MatDialog,
    private loaderService: LoaderService
    ) {
      super();
    }

  private _findOptions(dataSource: any, key: any) {
    return _.find(dataSource, { value: key })?.label || '-';
  }
  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      if (res) {
        /**
         * show action buttons if process = consider || approve
         */
        this.showActionButtons = [1, 2].includes(Number(res.get('type')));
      }
      this.pageType = Number(res.get('processId'));

      console.log('page type = ', this.pageType);
    });
    this.getall();
    // this.onSearch();
  }

  getall() {
    this.uniInfoService
    .getUniuniversity()
    .pipe(
      map((res) => {
        return res?.datareturn?.map(({ id, name, campusname }: any) => ({
          value: id,
          label: name + (campusname ? `, ${campusname}` : ''),
        }));
      })
    )
    .subscribe((data) => {
      this.uniUniversityOption = data;
    });
    this.uniInfoService
    .uniDegreeLevel()
    .pipe(mapOption())
    .subscribe((res) => {
      this.degreeLevelOptions = res;
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
      requestno,
      requestdate,
      fulldegreename,
      unicode,
      uniid,
      degreeapprovecode,
      degreelevel,
      admissionstatus,
      graduatestatus
    } = this.form.controls.search.value as any;
    return {
      requestno: requestno || null,
      requestdate: requestdate || null,
      fulldegreenameth: fulldegreename || null,
      unicode: unicode || null,
      uniid: uniid || null,
      unitype: null,
      statusadmission: admissionstatus,
      statusgraduate: graduatestatus,
      degreeapprovecode: degreeapprovecode || null,
      degreelevel: degreelevel || null,
      courseacademicyear: null,
      uniprovince: null,
      coursemajor: null,
      coursefieldofstudy: null,
      coursesubjects: null,
      ...this.tableRecord,
    };
  }

  override search() {
    for (let index = 0; index < 10; index++) {
      this.data = [...this.data, data];
    }
    this.requestService.searchAdmissionRequest(this.getRequest()).subscribe((res: any) => {
      if (res.returncode != '98') {
        this.pageEvent.length = res.countnum;
        this.dataSource.data = res.datareturn.map((item: any, index: any) => {
          item.order = index+1;
          if (item.requesttype == '05') {
            item.admissionstatus = this.mapStatusProcess(item.status, item.process);
            item.graduatestatus = '';
          } else {
            item.graduatestatus = this.mapStatusProcess(item.status, item.process);
            item.admissionstatus = '';
          }
          item.requestdate = thaiDate(new Date(item?.requestdateunirequestadmission));
          item.updatedate = item?.updatedate ? thaiDate(new Date(item?.updatedate)) : '';
          const degreeLevel = this._findOptions(
            this.degreeLevelOptions,
            item?.degreelevel
          );
          console.log(degreeLevel)
          item.degreelevelname = degreeLevel;
          return item
        });
      } else {
        this.dataSource.data = [];
      }
    });
  }

  mapStatusProcess(status: string, process: string) {
    if (process == '2' && status == '1') {
      return 'รอตรวจสอบ';
    } else if (process == '3' && status == '0') {
      return 'ส่งคืนและยกเลิก';
    } else if (process == '3' && status == '2') {
      return 'แก้ไข';
    } else if (process == '3' && status == '3') {
      return 'ตรวจสอบเรียบร้อย';
    } else {
      return '';
    }
  }

  onClear() {
    this.form.reset();
    this.dataSource.data = [];
  }

  viewhistory(item: any){
    const payload = {
      id: item.unirequestadmissionid,
      offset: 0,
      row: 100
    };
    this.requestService.requestAdmissionHistory(payload).subscribe((response => {
      if (response.datareturn) {
        response.datareturn = response.datareturn.map((data:any)=>{
          data.requestdate = data.processupdatedate;
          data.updateby = data.firstnameth;
          return data
        }).sort((data1:any,data2:any) => data1.id - data2.id);
      }
      this.opendialogHistory(response.datareturn);
    }));
  }

  opendialogHistory(data: any) {
    this.dialog.open(HistoryRequestAdmissionDialogComponent, {
      width: '600px',
      data: {
        data: data,
        system: 'eservice'
      }
    });
  }

  consider() {
    this.router.navigate(['/degree-cert', 'verify', 1]);
  }

  approve() {
    this.router.navigate(['/degree-cert', 'verify', 2]);
  }

  goToDetailPage(requestid: any) {
    this.router.navigate(['/degree-cert', 'student-list', requestid]);
  }

  lastStep() {
    this.router.navigate(['/degree-cert', 'final-result']);
  }
}

const displayedColumns: string[] = [
  'order',
  'requestno',
  'unicode',
  'degreeapprovecode',
  'uniname',
  'degreelevel',
  'degreename',
  'admissionstatus',
  'graduatestatus',
  'updatedate',
  'requestdate',
  'history',
  'print'
];
export interface DegreeCertInfo {
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

export const data: DegreeCertInfo = {
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
  consider: 'ตรวจสอบแล้ว',
};
