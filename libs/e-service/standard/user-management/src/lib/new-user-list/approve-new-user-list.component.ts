import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestProcess } from '@ksp/shared/constant';
import {
  EsSearchPayload,
  KspRequest,
  RequestSearchFilter,
  SchoolUserPageType,
} from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import {
  checkStatus,
  replaceEmptyWithNull,
  schoolMapRequestType,
} from '@ksp/shared/utility';

@Component({
  templateUrl: './approve-new-user-list.component.html',
  styleUrls: ['./approve-new-user-list.component.scss'],
})
export class ApproveNewUserListComponent implements AfterViewInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<KspRequest>();
  checkStatus = checkStatus;
  statusList = SchoolRequestProcess.find((i) => i.requestType === 1)?.status;
  mapRequestType = schoolMapRequestType;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedUniversity = '';

  constructor(
    private router: Router,
    private eRequestService: ERequestService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: RequestSearchFilter) {
    //console.log('params  = ', params);
    let payload: EsSearchPayload = {
      systemtype: '3',
      requesttype: params.requesttype,
      requestno: params.requestno,
      careertype: null,
      name: params.name,
      idcardno: null,
      passportno: null,
      process: null,
      status: params.requeststatus,
      schoolid: params.schoolinfo?.schoolid,
      schoolname: params.schoolinfo?.schoolname,
      bureauid: params.schoolinfo?.bureauid,
      requestdatefrom: params.requestdatefrom,
      requestdateto: null,
      offset: '0',
      row: '500',
    };

    payload = replaceEmptyWithNull(payload);

    this.eRequestService.KspSearchRequest(payload).subscribe((res) => {
      //console.log('res = ', res);
      if (res) {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;

        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      } else {
        this.clear();
      }
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
  }

  goToDetail(id: number) {
    this.router.navigate(['uni', 'user-detail', id], {
      queryParams: { type: SchoolUserPageType.NewUser },
    });
  }
}

export const column: string[] = [
  'id',
  'view',
  'requestno',
  'name',
  'contactphone',
  'coordinatorname',
  'schoolname',
  //'provience',
  'requestType',
  'requeststatus',
  'requestdate',
];