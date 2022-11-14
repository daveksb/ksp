import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestProcess } from '@ksp/shared/constant';
import {
  EsSearchPayload,
  KspRequest,
  ListData,
  RequestSearchFilter,
  SchoolUserPageType,
} from '@ksp/shared/interface';
import { ERequestService, EUniService, UniInfoService } from '@ksp/shared/service';
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
  searchType = "uni"

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedUniversity = '';
  uniUniversityTypeOption: ListData[] = [];

  constructor(
    private router: Router,
    private eRequestService: ERequestService,
    private uniInfoService: UniInfoService,
    private eUniService: EUniService
  ) {
    this.getOptions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getOptions() {
    this.uniInfoService.getUniversityType().subscribe(response=>{
      if (response) {
        this.uniUniversityTypeOption = response;
      }
    })
  }

  search(params: RequestSearchFilter) {
    console.log('params  = ', params);
    let payload = {
      systemtype: '3',
      requesttype: params.requesttype,
      requestno: params.requestno,
      careertype: null,
      name: params.name,
      idcardno: null,
      passportno: null,
      process: null,
      status: params.requeststatus,
      unicode: params.schoolinfo?.schoolid,
      uniname: params.schoolinfo?.schoolname,
      unitype: params.schoolinfo?.bureauid,
      requestdatefrom: params.requestdatefrom,
      requestdateto: null,
      offset: '0',
      row: '500',
    };

    payload = replaceEmptyWithNull(payload);

    this.eUniService.KspSearchUniRequest(payload).subscribe((res) => {
      //console.log('res = ', res);
      if (res) {
        this.dataSource.data = res.map((data: any) => {
          data.educationoccupy = JSON.parse(data.educationoccupy);
          data.coordinatorinfo = JSON.parse(data.coordinatorinfo);
          data.coordinatorname = data.coordinatorinfo?.firstnameth.concat(" ", data.coordinatorinfo?.lastnameth);
          data.requesttype = parseInt(data.requesttype);
          return data;
        });
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
