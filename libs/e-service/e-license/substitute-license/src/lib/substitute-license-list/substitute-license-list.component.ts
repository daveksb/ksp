import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
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
  SelfCheckProcess,
  SelfcheckStatus,
  replaceEmptyWithNull,
  processFilter,
} from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'ksp-substitute-license-list',
  templateUrl: './substitute-license-list.component.html',
  styleUrls: ['./substitute-license-list.component.scss'],
})
export class SubstituteLicenseListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();
  SelfServiceRequestSubType = SelfServiceRequestSubType;
  provinces$!: Observable<Province[]>;
  checkProcess = SelfCheckProcess;
  checkStatus = SelfcheckStatus;
  searchNotFound = false;

  form = this.fb.group({
    search: [],
  });

  constructor(
    private fb: FormBuilder,
    private requestService: ERequestService,
    private router: Router,
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
    this.searchNotFound = false;

    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: SelfServiceRequestType.ขอใบแทนใบอนุญาตประกอบวิชาชีพ,
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
        this.dataSource.data = processFilter(res);
        this.dataSource.sort = this.sort;

        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);

        //this.searchNotFound = false;
      } else {
        this.clear();
        this.searchNotFound = true;
      }
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/sub-license', 'approve-detail', id]);
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
