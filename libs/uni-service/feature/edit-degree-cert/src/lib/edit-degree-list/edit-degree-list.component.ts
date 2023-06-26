import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { requestEditStatus } from '@ksp/shared/constant';
import { ListData, KspPaginationComponent } from '@ksp/shared/interface';
import { UniInfoService, AddressService, LoaderService } from '@ksp/shared/service';
import { getCookie, thaiDate } from '@ksp/shared/utility';
import {
  EditDegreeCertSearchComponent,
  HistoryRequestDialogComponent,
} from '@ksp/uni-service/dialog';
import _ from 'lodash';
import moment from 'moment';
import { map, Subject } from 'rxjs';
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
  selector: 'ksp-edit-degree-list',
  templateUrl: './edit-degree-list.component.html',
  styleUrls: ['./edit-degree-list.component.scss'],
})
export class EditDegreeListComponent
  extends KspPaginationComponent
{
  form = this.fb.group({
    search: [{}],
  });
  displayedColumns: string[] = displayedColumns;
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  degreeLevelOptions: ListData[] = [];
  fieldOfStudyOptions: ListData[] = [];
  majorOptions: ListData[] = [];
  subjectOptions: ListData[] = [];
  academicYearOptions: ListData[] = [];
  provinces: ListData[] = [];
  universityType: ListData[] = [];
  universities: ListData[] = [];
  statusList = requestEditStatus;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private addressService: AddressService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    super();
    this.getAll();
  }
  clear() {
    this.form.reset();
    this.form.setValue({
      search: {
        universityType: getCookie('uniType'),
        institutionName: getCookie('uniId'),
      },
    });
    this.clearPageEvent();
    this.dataSource.data = [];
  }

  searchLicense() {
    this.dialog.open(EditDegreeCertSearchComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },
    });
  }

  onOpenHistory(e: any) {
    this.uniInfoService
      .uniRequestDegreeCertSelectUniDegreeCertId(e?.key)
      .subscribe((res: any) => {
        this.dialog.open(HistoryRequestDialogComponent, {
          width: '473px',
          data: res?.datareturn,
        });
      });
  }

  getAll() {
    this.form.setValue({
      search: {
        universityType: getCookie('uniType'),
        institutionName: getCookie('uniId'),
      },
    });
    this.uniInfoService
      .getUniversityType()
      .pipe(mapOption())
      .subscribe((res) => {
        this.universityType = res;
      });

    this.uniInfoService
      .uniDegreeLevel()
      .pipe(mapOption())
      .subscribe((res) => {
        this.degreeLevelOptions = res;
      });

    this.uniInfoService
      .uniFieldOfStudy()
      .pipe(mapOption())
      .subscribe((res) => {
        this.fieldOfStudyOptions = res;
      });

    this.uniInfoService
      .searchTypeidUniUniversity(getCookie('uniType'))
      .pipe(
        map((data) => {
          return data.map(({ id, name, campusname }: any) => ({
            value: id,
            label: name + (campusname ? `, ${campusname}` : ''),
          }));
        })
      ).subscribe((res) => {
        this.universities = res;
      });
    this.uniInfoService
      .uniAcademicYear()
      .pipe(mapOption())
      .subscribe((res) => {
        this.academicYearOptions = res;
      });
    this.addressService
      .getProvinces()
      .pipe(
        map((data: any) => {
          return (
            data?.map((data: any) => ({
              label: _.get(data, 'province_name'),
              value: _.get(data, 'province_id'),
            })) || []
          );
        })
      )
      .subscribe((res) => {
        this.provinces = res;
      });
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
      unicode: institutionNumber || null,
      uniid: institutionName || null,
      fulldegreenameth: degreeName || null,
      requestno: requestno,
      requestdate: date ? moment(date).format('YYYY-MM-DD') : null,
      coursestatus: courseStatus || null,
      degreelevel: submitDegreeLevel || null,
      requeststatus: approveStatus || null,
      requestprocess: verifyStatus || null,
      ...this.tableRecord,
    };
  }

  override search() {
    this.uniInfoService.editUniDegreeSearch(this.getRequest()).subscribe(async (res) => {
      const newData: any = [];
      this.pageEvent.length = res.countrow;
      for (const row of res?.datareturn || []) {
        const degreeCode = this._findOptions(
          this.degreeLevelOptions,
          row?.degreelevel
        );
        const submitDate = row?.requestdate
          ? new Date(row?.requestdate)
          : '-';
        const { major, branch } = await this.uniInfoService.getMajorAndBranch(
          row
        );
        const detailapprove = row.detail ? JSON.parse(row.detail) : null;
        // const approveDate = row?.courseapprovedate
        //   ? moment(row?.courseapprovedate).format('DD/MM/YYYY')
        //   : '-';
        const approveDate = detailapprove?.approvedate ? detailapprove?.approvedate : null;
        const findStatus = this.statusList.find((data: any) => { return data.value == row.status });
        newData.push({
          key: row?.id,
          requestId: row?.requestno || '-',
          submitDate,
          approveCode: row?.degreeapprovecode || '-',
          degreeCode,
          major,
          branch,
          university: row?.uniname || '-',
          degreeName: row?.fulldegreenameth || '-',
          approveDate: approveDate ? thaiDate(approveDate) : '',
          status: row?.status,
          process: row?.process,
          statusname: findStatus?.ulabel,
          createdate: row?.createdate
        });
      }
      this.dataSource.data = newData;
    });
  }
  private _findOptions(dataSource: any, key: any) {
    return _.find(dataSource, { value: key })?.label || '-';
  }
  onEdit(rowData: any) {
    this.router.navigate(['/edit-degree-cert', 'detail', 'edit'], {
      queryParams: {
        id: rowData?.key,
      },
    });
  }
}

const displayedColumns: string[] = [
  'order',
  'requestId',
  'submitDate',
  'approveCode',
  'degreeCode',
  'university',
  'degreeName',
  'major',
  'branch',
  'verifyStatus',
  'approveDate',
  'edit',
  'print',
  'history',
];

export interface DegreeCertInfo {
  order: number;
  requestId: string;
  submitDate: string;
  approveCode: string;
  degreeCode: string;
  university: string;
  degreeName: string;
  major: string;
  branch: string;
  verifyStatus: string;
  approveDate: string;
}

export const data: DegreeCertInfo[] = [
  {
    order: 1,
    requestId: 'string',
    submitDate: 'string',
    approveCode: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    branch: 'string',
    verifyStatus: 'string',
    approveDate: 'string',
  },
  {
    order: 2,
    requestId: 'string',
    submitDate: 'string',
    approveCode: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    branch: 'string',
    verifyStatus: 'string',
    approveDate: 'string',
  },
  {
    order: 3,
    requestId: 'string',
    submitDate: 'string',
    approveCode: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    branch: 'string',
    verifyStatus: 'string',
    approveDate: 'string',
  },
];
