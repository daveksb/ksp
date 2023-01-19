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
import { EsSearchPayload, Province, SelfRequest } from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  LoaderService,
} from '@ksp/shared/service';
import { processFilter, replaceEmptyWithNull } from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

function checkProcess(processId: number, requestType: number) {
  const process = SelfRequestProcess.find((p) => {
    return p.processId === processId && p.requestType === requestType;
  });
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
  selector: 'ksp-renew-license-foreign-list',
  templateUrl: './renew-license-foreign-list.component.html',
  styleUrls: ['./renew-license-foreign-list.component.scss'],
})
export class RenewLicenseForeignListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  SchoolRequestSubType = SchoolRequestSubType;
  provinces$!: Observable<Province[]>;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  checkProcess = checkProcess;
  checkStatus = checkStatus;
  searchNotFound = false;

  form = this.fb.group({
    search: [{ requesttype: '3' }],
  });

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private addressService: AddressService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.provinces$ = this.addressService.getProvinces();
  }

  search(params: any) {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ,
      requestno: params.requestno,
      careertype: params.careertype,
      name: null,
      idcardno: params.idcardno,
      passportno: null,
      process: params.process,
      status: params.status,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      offset: '0',
      row: '1000',
      isforeign: '1',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      //onsole.log(res);
      if (res) {
        this.dataSource.data = processFilter(res);
        this.dataSource.sort = this.sort;

        const sortState: Sort = {
          active: 'requestdate',
          direction: 'asc',
        };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);

        this.searchNotFound = false;
      } else {
        this.clear();
        this.searchNotFound = true;
      }
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/renew-foreign-license', 'detail', id]);
  }

  clear() {
    this.searchNotFound = false;
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
