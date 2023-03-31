import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { requestStatus } from '@ksp/shared/constant';
import { LoaderService, UniInfoService, UniRequestService } from '@ksp/shared/service';
import { formatRequestNo, getCookie, providerFactory, replaceEmptyWithNull, thaiDate } from '@ksp/shared/utility';
import { HistoryRequestDialogComponent, PrintRequestDialogComponent } from '@ksp/uni-service/dialog';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import _ from 'lodash';
import { map, Subject } from 'rxjs';
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
  selector: 'ksp-edit-student-list',
  templateUrl: './edit-student-list.component.html',
  styleUrls: ['./edit-student-list.component.scss'],
  providers: providerFactory(EditStudentListComponent),
})
export class EditStudentListComponent extends KspPaginationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = column;
  degreeLevelOptions: ListData[] = [];
  requestStatusOptions: ListData[] = requestStatus;
  dataSource = new MatTableDataSource<studentList>();
  // '3-08-5-651004-00005'
  form = this.fb.group({
    requestno: [],
    degreelevel: [],
    fulldegreename: [],
    coursemajor: [],
    plancalendaryear: [],
    courseacademicyear: [],
    status: [null],
    cardno: [],
    name: [],
    requestdatefrom: [],
    requestdateto: [],
    process: []
  })
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private uniRequestService: UniRequestService,
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

  getAll() {
    this.uniInfoService
    .uniDegreeLevel()
    .pipe(mapOption())
    .subscribe((res) => {
      this.degreeLevelOptions = res;
    });
  }

  getRequest() {
    const form = this.form.value as any;
    if (form.requestdatefrom) {
      form.requestdatefrom = new Date(form.requestdatefrom)
      form.requestdatefrom.setHours(form.requestdatefrom.getHours() + 7)
    }
    if (form.requestdateto) {
      form.requestdateto = new Date(form.requestdateto)
      form.requestdateto.setHours(form.requestdateto.getHours() + 7)
    }
    let nameData = {};
    if (form.name) {
      const newName = form.name.split(' ');
      if (newName.length > 1) {
        nameData = {
          firstnameth: newName[0],
          lastnameth: newName[1]
        }
      } else {
        nameData = {
          firstnameth: newName[0]
        }
      }
    }
    return {
      uniid: getCookie('uniId'),
      unitype: getCookie('uniType'),
      requestno: form.requestno ? form.requestno.replaceAll('-','') : '',
      degreelevel: form.degreelevel,
      fulldegreename: form.fulldegreename,
      coursemajor: form.coursemajor,
      plancalendaryear: form.plancalendaryear,
      courseacademicyear: form.plancalendaryear,
      cardno: form.cardno,
      ...nameData,
      requestdatefrom: form.requestdatefrom,
      requestdateto: form.requestdateto,
      process: form.process,
      status: form.status,
      ...this.tableRecord
    };
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
          data.requeststatusname = data.status == '1' ? 'ยื่นข้อมูล' :
                               data.status == '2' ? 'รับข้อมูล' :
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
  'edit',
  'print',
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
