import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelfServiceRequestType } from '@ksp/shared/constant';
import { EsSearchPayload, SelfRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-e-senior-teacher-list',
  templateUrl: './e-senior-teacher-list.component.html',
  styleUrls: ['./e-senior-teacher-list.component.scss'],
})
export class ESeniorTeacherListComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();

  constructor(
    private router: Router,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {}

  search() {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอรับรางวัลครูอาวุโส,
      requestno: null,
      careertype: null,
      name: null,
      idcardno: null,
      passportno: null,
      process: null,
      status: null,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: null,
      requestdateto: null,
      offset: '0',
      row: '1000',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      this.dataSource.data = res;
      // this.dataSource.sort = this.sort;

      // const sortState: Sort = { active: 'id', direction: 'desc' };
      // this.sort.active = sortState.active;
      // this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  view() {
    this.router.navigate(['/senior-teacher', 'detail']);
  }
}

export interface userList {
  order: number;
  licenseNumber: string;
  schoolCode: string;
  schoolName: string;
  workName: string;
  consider: string;
  lastEditDate: string;
  submitDate: string;
  objection: string;
}

export const column = [
  'order',
  'licenseNumber',
  'schoolCode',
  'schoolName',
  'workName',
  'consider',
  'lastEditDate',
  'submitDate',
  'objection',
  'verify',
  'request',
  'edit',
];

export const data: userList[] = [
  {
    order: 1,
    licenseNumber: 'xxx',
    schoolCode: '1234xxxxxxxx',
    schoolName: 'xxx xxxx xxxxxx',
    workName: '098-xxx-xxxx',
    consider: 'xxx xxxx xxxx',
    lastEditDate: 'xxxxxx',
    submitDate: 'xxxxxx',
    objection: 'รอการอนุมัติ',
  },
  {
    order: 2,
    licenseNumber: 'xxx',
    schoolCode: '1234xxxxxxxx',
    schoolName: 'xxx xxxx xxxxxx',
    workName: '098-xxx-xxxx',
    consider: 'xxx xxxx xxxx',
    lastEditDate: 'xxxxxx',
    submitDate: 'xxxxxx',
    objection: 'รอการอนุมัติ',
  },
];
