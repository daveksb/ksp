import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SchoolRequestSubType,
  SchoolRequestType,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import { EsSearchPayload, SelfRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import {
  eSelfCheckProcess,
  eSelfCheckStatus,
  processFilter,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-list',
  templateUrl: './renew-license-list.component.html',
  styleUrls: ['./renew-license-list.component.scss'],
})
export class RenewLicenseListComponent implements AfterViewInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  SchoolRequestSubType = SchoolRequestSubType;

  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  checkProcess = eSelfCheckProcess;
  checkStatus = eSelfCheckStatus;

  form = this.fb.group({
    search: [],
  });

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private fb: FormBuilder
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอต่ออายุใบอนุญาตประกอบวิชาชีพ,
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
      this.dataSource.data = processFilter(res);
      this.dataSource.sort = this.sort;

      const sortState: Sort = { active: 'requestdate', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/renew-license', 'approve-detail', id]);
  }

  clear() {
    this.dataSource.data = [];
  }
}

export const column = [
  'id',
  'edit',
  'requestno',
  'idcardno',
  'name',
  'subtype',
  'currentprocess',
  'requeststatus',
  'updatedate',
  'requestdate',
  'reqDoc',
  //'approveDoc',
];
