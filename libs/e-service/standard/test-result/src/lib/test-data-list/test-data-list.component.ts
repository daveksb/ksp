import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EUniService } from '@ksp/shared/service';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import { map } from 'rxjs';
const DEFAULT_DATE = new Date().getFullYear() + 543 + '';
@Component({
  selector: 'ksp-test-data-list',
  templateUrl: './test-data-list.component.html',
  styleUrls: ['./test-data-list.component.scss'],
})
export class TestDataListComponent
  extends KspPaginationComponent
  implements OnInit
{
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<TestResult>();
  yearOption: ListData[] = [];
  courseNameOption: ListData[] = [];
  form = this.fb.group({
    subjectid: [],
    subjectname: [],
    examstatus: [],
    examresult: [],
    idcardno: [],
    fullname: [],
    calendaryear: [DEFAULT_DATE],
  });
  constructor(
    private router: Router,
    private eUniservice: EUniService,
    private fb: FormBuilder
  ) {
    super();
    this.getYear();
  }
  getYear() {
    const year = new Date().getFullYear() + 543;
    this.yearOption = new Array(11).fill(null).map((data, i) => {
      const value = year - i + '';
      return {
        label: value,
        value: value,
      };
    });
  }
  override search() {
    this.eUniservice
      .uniExamResultSearchEs({
        ...this.form.value,
        ...this.tableRecord,
      })
      .subscribe((res) => {
        if (res?.returncode === '00') {
          this.pageEvent.length = res.countrow;
          this.dataSource.data = res?.datareturn || [];
        } else {
          this.dataSource.data = [];
          this.clearPageEvent();
        }
      });
  }

  clear() {
    this.dataSource.data = [];
    this.form.reset()
  }

  import() {
    this.router.navigate(['/', 'import-test', 'detail']);
  }

  ngOnInit(): void {
    this.eUniservice
      .getUniExamCourse()
      .pipe(
        map((res: any): any => {
          return (
            res?.datareturn?.map((op: any) => ({
              value: op?.coursename,
              label: op?.coursename,
            })) || []
          );
        })
      )
      .subscribe((res: any) => {
        this.courseNameOption = res;
      });
  }
}

export const column = [
  'examcount',
  'calendaryear',
  'subjectid',
  'subjectname',
  'idcardno',
  'fullname',
  'userscore',
  'examresult',
  'examscore',
  'annoucedate',
  'expiredate',
];

export interface TestResult {
  examcount: string;
  calendaryear: string;
  subjectid: string;
  subjectname: string;
  idcardno: string;
  subjectcode: string;
  fullname: string;
  userscore: string;
  examresult: string;
  examscore: string;
  annoucedate: string;
  expiredate: string;
  isValid?: boolean;
}
