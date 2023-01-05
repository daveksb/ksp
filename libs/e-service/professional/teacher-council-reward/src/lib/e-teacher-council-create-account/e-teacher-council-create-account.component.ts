import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  SelfServiceRequestSubType,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import { EsSearchPayload, SchRequestSearchFilter } from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import { eSelfCheckStatus, replaceEmptyWithNull } from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-teacher-council-create-account',
  templateUrl: './e-teacher-council-create-account.component.html',
  styleUrls: ['./e-teacher-council-create-account.component.scss'],
})
export class ETeacherCouncilCreateAccountComponent
  implements OnInit, AfterViewInit
{
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns = [
    'select',
    'order',
    'requestNo',
    'id',
    'name',
    'careerType',
    'province',
    'result',
    'createDate',
    'requestDate',
    'view',
  ];
  dataSource = new MatTableDataSource<any>();
  SelfServiceRequestSubType = SelfServiceRequestSubType;
  checkStatus = eSelfCheckStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private loaderService: LoaderService,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: Partial<SchRequestSearchFilter>) {
    console.log(params);
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอรับรางวัลคุรุสภา,
      requestno: params.requestno,
      careertype: params.careertype,
      name: null,
      idcardno: null,
      passportno: null,
      process: null,
      status: null,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      provinceid: params.provinceid,
      offset: '0',
      row: '1000',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      console.log(res);
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
}
