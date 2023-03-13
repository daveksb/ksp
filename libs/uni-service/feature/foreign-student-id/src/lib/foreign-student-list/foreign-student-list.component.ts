/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { KspPaginationComponent } from '@ksp/shared/interface';
import { LoaderService, UniInfoService } from '@ksp/shared/service';
import { checkProcess, checkStatus, getCookie, stringToThaiDate, thaiDate } from '@ksp/shared/utility';
import moment from 'moment';
import { map, Subject } from 'rxjs';

@Component({
  selector: 'ksp-foreign-student-list',
  templateUrl: './foreign-student-list.component.html',
  styleUrls: ['./foreign-student-list.component.scss'],
})
export class ForeignStudentListComponent
  extends KspPaginationComponent
  implements OnInit
{
  checkProcess = checkProcess;
  checkStatus = checkStatus;
  dataSource = [];
  uniUniversityOption: any[] = [];
  displayedColumns = displayedColumns;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  form = this.fb.group({
    search: [{}],
  });
  constructor(
    private uniInfoService: UniInfoService, 
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private router: Router,) {
    super();
  }

  ngOnInit(): void {
    this.uniInfoService
      .getUniuniversity()
      .pipe(
        map((res) => {
          return res?.datareturn?.map(({ id, name, campusname }: any) => {
            return { id: id,
                     name: name + (campusname ? `, ${campusname}` : '')
                   }
          });
        })
      )
      .subscribe((data) => {
        this.uniUniversityOption = data;
      });
    this.form.setValue({
      search: {
        uniid: getCookie('uniId'),
      },
    });
  }
  override search() {
    const {
      requestdatefrom,
      requestdateto,
      name,
      requestno,
      passportno,
      uniid,
    } = this.form.value.search as any;
    this.uniInfoService
      .kspRequestSearchUni({
        requestdatefrom:  requestdatefrom ? moment(requestdatefrom).format('YYYY-MM-DD') : '',
        requestdateto: requestdateto || '',
        name: name || '',
        requestno: requestno || '',
        passportno: passportno || '',
        uniid: uniid || '',
        ...this.tableRecord,
      })
      .subscribe((res) => {
        if (!res?.datareturn) return;
        this.pageEvent.length = res.countrow;
        this.dataSource = res?.datareturn?.map((item: any, index: number) => {
          return {
            requestid: item?.id,
            key: item?.id,
            order: this.pageEvent.pageIndex * this.pageEvent.pageSize + ++index,
            requestNo: item?.requestno,
            passportNo: item?.passportno,
            accountName: [item?.firstnameth, item?.lastnameth]
              .filter((d) => d)
              .join(' '),
            process: item.process,
            status: item.status,
            updateDate: item?.updatedate
              ? thaiDate(new Date(item?.updatedate))
              : '',
            requestDate: item?.requestdate
              ? thaiDate(new Date(item?.requestdate))
              : '',
          };
        });
      });
  }
  clear() {
    this.form.reset();
    this.form.setValue({
      search: {
        uniid: getCookie('uniId'),
      },
    });
    this.dataSource = [];
    this.clearPageEvent();
  }

  viewRequest(element: any) {
    console.log(element.requestid)
    this.router.navigate([
      '/',
      'foreign-student-id',
      'request',
      element.requestid,
    ]);
  }
}

const displayedColumns: string[] = [
  'order',
  'requestNo',
  'passportNo',
  'accountName',
  'process',
  'status',
  'updateData',
  'requestDate',
  'download',
  'view',
];
