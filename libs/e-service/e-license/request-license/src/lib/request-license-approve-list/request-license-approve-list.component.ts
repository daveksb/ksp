import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SchoolRequestSubType,
  SchoolRequestType,
  SelfRequestProcess,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import { EsSearchPayload, SelfRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { processFilter, replaceEmptyWithNull } from '@ksp/shared/utility';

function checkProcess(processId: number, requestType: number) {
  const process = SelfRequestProcess.find((p) => {
    return p.processId === processId && p.requestType === requestType;
  });
  //console.log('process = ', process);
  return process;
}

function checkStatus(processId: number, statusId: number, requestType: number) {
  const process = checkProcess(processId, requestType);
  const status = process?.status.find((s) => {
    return s.id == statusId;
  });
  return status;
}

@Component({
  selector: 'ksp-request-license-approve-list',
  templateUrl: './request-license-approve-list.component.html',
  styleUrls: ['./request-license-approve-list.component.scss'],
})
export class RequestLicenseApproveListComponent implements AfterViewInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  SchoolRequestSubType = SchoolRequestSubType;

  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  checkProcess = checkProcess;
  checkStatus = checkStatus;

  form = this.fb.group({
    search: [{ requesttype: '3' }],
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
    console.log(params);
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ,
      requestno: params.requestno,
      careertype: params.subtype,
      name: null,
      idcardno: params.idcardno,
      passportno: null,
      process: params.currentprocess,
      status: params.requeststatus,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      offset: '0',
      row: '1000',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.data = processFilter(res);
      this.dataSource.sort = this.sort;

      const sortState: Sort = {
        active: 'processupdatedate',
        direction: 'desc',
      };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/request-license', 'approve-detail', id]);
  }

  clear() {
    this.dataSource.data = [];
  }

  createGroup() {
    this.router.navigate(['/request-license', 'create-group']);
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
