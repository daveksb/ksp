import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  RequestProcessList,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { SchoolRequest } from '@ksp/shared/interface';
import { RequestService, SchoolInfoService } from '@ksp/shared/service';

@Component({
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class SchoolRequestListComponent implements AfterViewInit {
  schoolId = '0010201056';
  displayedColumns: string[] = [
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
  dataSource = new MatTableDataSource<SchoolRequest>();
  SchoolRequestType = SchoolRequestType;
  SchoolRequestSubType = SchoolRequestSubType;
  currentPage = 0;
  isLastPage = false;
  pageRow = 10;
  searchParams: any;

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
        const result = this.applyClientFilter(res, filters);
        this.dataSource.data = result;
      }
    });
  }

  applyClientFilter(data: SchoolRequest[], oldFilters: any) {
    //
    const { requesttype, ...param } = oldFilters;
    console.log('param = ', param);
    return data.filter((d) => {
      const filter1 = param.subtype ? `${d.subtype}` === param.subtype : true;

      const filter2 = param.requestno
        ? d.requestno?.includes(param.requestno)
        : true;

      const filter3 = param.firstnameth
        ? d.firstnameth?.includes(param.firstnameth) ||
          d.lastnameth?.includes(param.firstnameth)
        : true;

      const filter4 = param.idcardno
        ? d.idcardno?.includes(param.idcardno)
        : true;

      const filter5 = param.passportno
        ? d.passportno?.includes(param.passportno)
        : true;

      const filter6 = param.currentprocess
        ? `${d.currentprocess}` === param.currentprocess
        : true;

      return filter1 && filter2 && filter3 && filter4 && filter5 && filter6;
    });
  }

  clear() {
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

  checkProcess(processId: number) {
    const process = RequestProcessList.find((p) => {
      return p.processId === processId && p.requestType === 3;
    });

    return process;
  }

  checkStatus(processId: number, statusId: number) {
    const process = this.checkProcess(processId);
    const status = process?.status.find((s) => {
      return (s.id = statusId);
    });
    return status;
  }

  checkRequestType(RequestTypeId: number) {
    return SchoolRequestType.find((s) => s.id === RequestTypeId)?.name;
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
