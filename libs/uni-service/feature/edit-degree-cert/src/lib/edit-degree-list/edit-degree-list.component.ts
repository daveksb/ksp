import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ListData } from '@ksp/shared/interface';
import { UniInfoService, AddressService } from '@ksp/shared/service';
import {
  EditDegreeCertSearchComponent,
  HistoryRequestDialogComponent,
} from '@ksp/uni-service/dialog';
import _ from 'lodash';
import moment from 'moment';
import { map, switchMap, lastValueFrom } from 'rxjs';
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
export class EditDegreeListComponent implements OnInit {
  form = this.fb.group({
    homeSearch: [],
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
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private addressService: AddressService
  ) {
    this.getAll();
  }
  clear() {
    this.dataSource.data = [];
  }

  searchLicense() {
    this.dialog.open(EditDegreeCertSearchComponent, {
      height: '100vh',
      width: '1000px',
      position: {
        top: '0px',
        right: '0px',
      },
    });
  }

  history() {
    this.dialog.open(HistoryRequestDialogComponent, {
      width: '400px',
    });
  }

  ngOnInit(): void { }

  getAll() {
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
  search() {
    const value: any = this.form.value?.homeSearch;
    const payload = {
      uniid: value?.university || '',
      unitype: value?.universityType || '',
      fulldegreenameth: value?.degreeName || '',
      degreelevel: value?.degreeLevel || '',
      courseacademicyear: value?.year || '',
      degreeapprovecode: value?.degreeCode || '',
      coursefieldofstudy: value?.fieldOfStudy || '',
      coursemajor: value?.major || '',
      coursesubjects: value?.subject || '',
      uniprovince: value?.province || '',
      offset: '0',
      row: '10',
    };
    this.uniInfoService.uniDegreeSearch(payload).subscribe(async (res) => {
      const newData: any = [];
      for (const row of res?.datareturn) {
        const degreeCode = this._findOptions(
          this.degreeLevelOptions,
          row?.degreelevel
        );
        const approveDate = row?.createdate
          ? moment(row?.createdate).format('DD/MM/YYYY')
          : '-';
        const submitDate = row?.requestdate
          ? moment(row?.requestdate).format('DD/MM/YYYY')
          : '-';
        const { major, branch } = await this.uniInfoService.getMajorAndBranch(row);
        newData.push({
          requestId: row?.requestno || '-',
          submitDate,
          approveCode: row?.degreeapprovecode || '-',
          degreeCode,
          major,
          branch,
          university: row?.uniname || '-',
          degreeName: row?.fulldegreenameth || '-',
          approveDate: approveDate,
        });
      }
      this.dataSource.data = newData;
    });
  }
  private _findOptions(dataSource: any, key: any) {
    return _.find(dataSource, { value: key })?.label || '-';
  }
}

const displayedColumns: string[] = [
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
