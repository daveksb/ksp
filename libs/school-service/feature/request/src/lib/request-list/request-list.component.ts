import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestSubType, SchoolRequestType } from '@ksp/shared/constant';
import { SchoolRequest } from '@ksp/shared/interface';
import { RequestService } from '@ksp/shared/service';
import { applyClientFilter } from '@ksp/shared/utility';
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
  currentPage = 0;
  isLastPage = false;
  pageRow = 10;
  searchParams: any;
  checkProcess = checkProcess;
  checkRequestType = checkRequestType;
  checkStatus = checkStatus;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);

  form = this.fb.group({
    licenseSearch: [],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: RequestService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(filters: any) {
    //console.log('params = ', params);
    const payload = {
      systemtype: '2',
      requesttype: `${filters.requesttype}`,
      schoolid: `${this.schoolId}`,
      subtype: filters.subtype,
    };

    this.searchParams = payload;
    this.isLastPage = false;

    this.requestService.searchRequest(payload).subscribe((res) => {
      //console.log('res = ', res);
      if (res && res.length) {
        const result = applyClientFilter(res, filters);
        this.dataSource.data = result;
      } else {
        this.dataSource.data = [];
      }
    });
  }

  clear() {
    this.form.reset();
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
        return this.qualificationPage(`${requestId}`);

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

  qualificationPage(id = '') {
    this.router.navigate(['/qualification-approve', 'detail', id]);
  }

  rewardPage(id = '') {
    this.router.navigate(['/request-reward', 'detail', id]);
  }
}

export interface TempLicenseInfo {
  id: number;
  requestno: string;
  idcardno: string;
  requesttype: string;
  currentprocess: string;
  requeststatus: string;
  updatedate: string;
  requestdate: string;
}

export const displayedColumns = [
  'id',
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
