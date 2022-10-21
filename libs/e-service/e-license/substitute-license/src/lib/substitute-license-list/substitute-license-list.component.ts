import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SchoolRequestSubType,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import {
  ESelfSearchPayload,
  EsSearchPayload,
  SelfRequest,
} from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import {
  checkProcess,
  checkStatus,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';

@Component({
  selector: 'ksp-substitute-license-list',
  templateUrl: './substitute-license-list.component.html',
  styleUrls: ['./substitute-license-list.component.scss'],
})
export class SubstituteLicenseListComponent implements AfterViewInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  SchoolRequestSubType = SchoolRequestSubType;

  checkProcess = checkProcess;
  checkStatus = checkStatus;

  form = this.fb.group({
    search: [],
  });

  constructor(
    private fb: FormBuilder,
    private requestService: ERequestService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(params: any) {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอใบแทนใบอนุญาตประกอบวิชาชีพ,
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
      this.dataSource.sort = this.sort;

      const sortState: Sort = { active: 'id', direction: 'desc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/sub-license', 'approve-detail', id]);
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
