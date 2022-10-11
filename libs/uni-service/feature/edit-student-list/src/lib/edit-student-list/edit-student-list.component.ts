import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { requestStatus } from '@ksp/shared/constant';
import { UniInfoService, UniRequestService } from '@ksp/shared/service';
import { stringToThaiDate, thaiDate } from '@ksp/shared/utility';
import { HistoryRequestDialogComponent, PrintRequestDialogComponent } from '@ksp/uni-service/dialog';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import _ from 'lodash';
import { map } from 'rxjs';
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
})
export class EditStudentListComponent extends KspPaginationComponent implements OnInit {
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
    requeststatus: [],
    cardno: [],
    name: [],
    requestdate: [],
    requestprocess: [],
    offset: [0],
    row: [10]
  })

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private uniRequestService: UniRequestService) {
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

  history(row: any) {
    const payload = {
      unirequestadmissionid: row.id
    };
    this.uniInfoService.uniRequestEditHistory(payload).subscribe((response => {
      if (response) {
        this.dialog.open(HistoryRequestDialogComponent, {
          width: '400px',
          data: response.datareturn
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

  searchdata() {
    this.uniRequestService.getEditRequestAdmision(this.form.value)
    .subscribe((response: any) => {
      if (response.datareturn) {
        this.pageEvent.length = response.countrow;
        this.dataSource.data = response.datareturn.map(((data: any)=>{
          const parsedata = JSON.parse(data.admissionlist);
          data.studentdetail = parsedata[0];
          data.nameshow = `${data.studentdetail.firstnameth ? data.studentdetail.firstnameth : ''}`+
                          ` ${data.studentdetail.lastnameth ? data.studentdetail.lastnameth : ''}`;
          data.requestdate = thaiDate(new Date(data?.requestdate));
          if (data.updatedate) data.updatedate = thaiDate(new Date(data?.updatedate));
          const finddegreelevel = this.degreeLevelOptions.find((level=>{
            return data.degreelevel == level.value;
          }))
          data.degreelevelname = finddegreelevel?.label || '';
          data.requeststatusname = data.requeststatus == '1' ? 'สร้าง' :
                               data.requeststatus == '2' ? 'ยื่นเรียบร้อย' :
                               data.requeststatus == '3' ? 'รับข้อมูล' : '';
          return data;
        }));
      } else {
        this.dataSource.data = [];
      }
    })
  }

  clear() {
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
