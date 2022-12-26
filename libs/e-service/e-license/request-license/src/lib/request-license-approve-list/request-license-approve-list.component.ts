import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SchoolRequestType,
  SelfServiceRequestSubType,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import { EsSearchPayload, Province, SelfRequest } from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  LoaderService,
} from '@ksp/shared/service';
import {
  eSelfCheckProcess,
  eSelfCheckStatus,
  processFilter,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'ksp-request-license-approve-list',
  templateUrl: './request-license-approve-list.component.html',
  styleUrls: ['./request-license-approve-list.component.scss'],
})
export class RequestLicenseApproveListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  SchoolRequestSubType = SelfServiceRequestSubType;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  checkProcess = eSelfCheckProcess;
  checkStatus = eSelfCheckStatus;
  provinces$!: Observable<Province[]>;
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
      systemtype: null,
      provinceid: params.province,
      requesttype: SelfServiceRequestType.ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ,
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
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      if (res) {
        this.dataSource.data = res;
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
    this.router.navigate(['/request-license', 'approve-detail', id]);
  }

  clear() {
    this.searchNotFound = false;
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
