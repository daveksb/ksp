import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { requestStatus } from '@ksp/shared/constant';
import { EUniService, LoaderService, UniInfoService, UniRequestService } from '@ksp/shared/service';
import { formatRequestNo, providerFactory, replaceEmptyWithNull, thaiDate } from '@ksp/shared/utility';
import { HistoryRequestDialogComponent, PrintRequestDialogComponent } from '@ksp/uni-service/dialog';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import _ from 'lodash';
import { lastValueFrom, map, Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
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
  selector: 'e-service-edit-student-list',
  templateUrl: './edit-student-list.component.html',
  styleUrls: ['./edit-student-list.component.scss'],
})
export class EserviceEditStudentListComponent extends KspPaginationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = column;
  degreeLevelOptions: ListData[] = [];
  requestStatusOptions: ListData[] = requestStatus;
  dataSource = new MatTableDataSource<studentList>();
  // '3-08-5-651004-00005'
  form = this.fb.group({
    search: [{}],
  });
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  uniUniversityOption: ListData[] = [];
  uniUniversityTypeOption: ListData[] = [];

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private uniRequestService: EUniService,
    private loaderService: LoaderService) {
      super();
    }

  ngOnInit(): void {
    this.getAll();     
    this.searchdata(); 
  }

  print(row: any) {
    const payload = {
      unirequestadmissionid: row.id
    };
    this.uniInfoService.uniRequestEditHistory(payload).subscribe((response => {
      if (response) {
        this.dialog.open(PrintRequestDialogComponent, {
          width: '600px',
          data: response.datareturn
        });
      }
    }));
  }

  private _findOptions(dataSource: any, key: any) {
    return _.find(dataSource, { value: key })?.label || '-';
  }

  history(row: any) {
    const payload = {
      unirequestadmissionid: row.id
    };
    this.uniInfoService.uniRequestEditHistory(payload).subscribe((response => {
      if (response) {
        this.dialog.open(HistoryRequestDialogComponent, {
          width: '600px',
          data: response.datareturn.map((data: any) => {
            data.requestprocess = data.process;
            return data;
          })
        });
      }
    }));
  }

  async getAll() {
    this.uniInfoService
    .uniDegreeLevel()
    .pipe(mapOption())
    .subscribe((res) => {
      this.degreeLevelOptions = res;
    });
    const [university, universityTypes] =
      await Promise.all([
        lastValueFrom(this.uniInfoService.getUniuniversity()),
        lastValueFrom(this.uniInfoService.getUniversityType()),
      ]);
    this.uniUniversityOption = university.datareturn.map((data: any) => {
      data.name = data.name + (data.campusname ? `, ${data.campusname}` : '')
      return data;
    });
    this.uniUniversityTypeOption = universityTypes;
  }

  getRequest() {
    const form = this.form.controls.search.value as any;
    if (form.requestsubmitDate) {
      form.requestsubmitDate = new Date(form.requestsubmitDate)
      form.requestsubmitDate.setHours(form.requestsubmitDate.getHours() + 7)
    }
    return {
      uniid: form.institution,
      unitype: form.affiliation,
      degreeapprovecode: form.degreeCode,
      fulldegreename: form.degreeName,
      degreelevel: form.degreeLevel,
      courseacademicyear: form.openYear,
      requestno: form.requestNumber ? form.requestNumber.replaceAll('-','') : '',
      requestdate: form.requestsubmitDate,
      ...this.tableRecord
    };
  }

  getUniversity(unitype: any) {
    this.uniInfoService.getUniversity(unitype).subscribe(response=>{
      if (response) {
        this.uniUniversityOption = response;
      }
    })
  }

  searchdata() {
    const formSearch = this.getRequest();
    this.uniRequestService.getEditRequestAdmision(replaceEmptyWithNull(formSearch))
    .subscribe((response: any) => {
      if (response.datareturn) {
        this.pageEvent.length = response.countrow;
        this.dataSource.data = response.datareturn.map(((data: any)=>{
          data.requestno = formatRequestNo(data.requestno);
          const parsedata = JSON.parse(data.admissionlist);
          data.studentdetail = parsedata;
          data.nameshow = `${data.studentdetail.firstnameth ? data.studentdetail.firstnameth : ''}`+
                          ` ${data.studentdetail.lastnameth ? data.studentdetail.lastnameth : ''}`;
          data.requestdate = thaiDate(new Date(data?.requestdate));
          if (data.updatedate) data.updatedate = thaiDate(new Date(data?.updatedate));
          const finddegreelevel = this.degreeLevelOptions.find((level=>{
            return data.degreelevel == level.value;
          }))
          data.degreelevelname = finddegreelevel?.label || '';
          data.requeststatusname = data.status == '1' ? 'รอตรวจสอบ' :
                               data.status == '2' ? 'ผ่านการตรวจสอบ' :
                               data.status == '3' ? 'ไม่ผ่านการตรวจสอบ' : '';
          return data;
        }));
      } else {
        this.dataSource.data = [];
      }
    })
  }

  clear() {
    this.form.reset();
    this.dataSource.data = [];
  }

  create() {
    this.router.navigate(['/', 'edit-student-list', 'detail']);
  }

  goToDetailPage(requestid: any) {
    this.router.navigate(['/degree-cert', 'edit-student-detail', requestid]);
  }
}

export const column = [
  'order',
  'requestId',
  'submitDate',
  'personId',
  'name',
  'degreeCode',
  'university',
  'degreeName',
  'major',
  'verifyStatus',
  'editDate',
];

export interface studentList {
  order: number;
  requestId: string;
  submitDate: string;
  personId: string;
  name: string;
  degreeCode: string;
  university: string;
  degreeName: string;
  major: string;
  verifyStatus: string;
  editDate: string;
}

export const data: studentList[] = [
  {
    order: 1,
    requestId: 'string',
    submitDate: 'string',
    personId: 'string',
    name: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    verifyStatus: 'สร้าง',
    editDate: 'string',
  },
  {
    order: 2,
    requestId: 'string',
    submitDate: 'string',
    personId: 'string',
    name: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    verifyStatus: 'ยื่นเรียบร้อย',
    editDate: 'string',
  },
  {
    order: 3,
    requestId: 'string',
    submitDate: 'string',
    personId: 'string',
    name: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    verifyStatus: 'รับข้อมูล',
    editDate: 'string',
  },
];