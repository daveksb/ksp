import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestSubType, SchoolRequestType } from '@ksp/shared/constant';
import { SchoolRequest } from '@ksp/shared/interface';
import { RequestService } from '@ksp/shared/service';
import {
  checkProcess,
  checkRequestType,
  checkStatus,
} from '@ksp/shared/utility';
@Component({
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class SchoolRequestListComponent implements AfterViewInit {
  schoolId = '0010201056';
  displayedColumns: string[] = displayedColumns;
  dataSource = new MatTableDataSource<SchoolRequest>();
  SchoolRequestSubType = SchoolRequestSubType;
  searchNotFound = false;

  searchParams: any;
  checkProcess = checkProcess;
  checkRequestType = checkRequestType;
  checkStatus = checkStatus;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);

  form = this.fb.group({
    licenseSearch: [],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: RequestService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(filters: any) {
    //console.log('filters = ', filters);
    const payload = {
      schoolid: `${this.schoolId}`,
      requesttype: `${filters.requesttype}`,
      requestno: filters.requestno,
      subtype: filters.subtype,
      name: filters.firstnameth,
      idcardno: filters.idcardno,
      passportno: filters.passportno,
      currentprocess: filters.currentprocess,
      requeststatus: filters.requeststatus,
      createdatefrom: filters.requestdatefrom,
      createdateto: filters.requestdateto,
      offset: '0',
      row: '500',
    };

    this.searchParams = payload;

    this.requestService.searchRequest(payload).subscribe((res) => {
      //console.log('res = ', res);
      if (res && res.length) {
        this.searchNotFound = false;
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;

        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      } else {
        this.dataSource.data = [];
        this.searchNotFound = true;
      }
    });
  }

  clear() {
    this.form.reset();
    this.searchNotFound = false;
    this.dataSource.data = [];
  }

  goToRequestPage(subType: number) {
    this.router.navigate(['/temp-license', 'request'], {
      queryParams: { subtype: subType },
    });
  }

  viewRequest(requestType: number, subType: number, requestId: number) {
    switch (requestType) {
      case 4:
        return this.foreignPage(`${requestId}`);

      case 6:
        return this.qualificationPage(requestId, subType);

      case 40:
        return this.rewardPage(`${requestId}`);
    }

    this.router.navigate(['/temp-license', 'request', requestId], {
      queryParams: { subtype: subType },
    });
  }

  foreignPage(id = '') {
    this.router.navigate(['/foreign-teacher', 'id-request', id]);
  }

  qualificationPage(id: number | null, subType: number) {
    if (id) {
      this.router.navigate(['/qualification-approve', 'detail', id], {
        queryParams: { subtype: subType },
      });
    } else {
      this.router.navigate(['/qualification-approve', 'detail'], {
        queryParams: { subtype: subType },
      });
    }
  }

  rewardPage(id = '') {
    this.router.navigate(['/request-reward', 'detail', id]);
  }
}

export interface TempLicenseInfo {
  order: number;
  requestno: string;
  idcardno: string;
  requesttype: string;
  currentprocess: string;
  requeststatus: string;
  updatedate: string;
  requestdate: string;
}

export const displayedColumns = [
  'order',
  'requestno',
  'idcardno',
  'name',
  'requesttype',
  'subtype',
  'currentprocess',
  'requeststatus',
  'updatedate',
  'requestdate',
  'requestdoc',
  'approvedoc',
];
