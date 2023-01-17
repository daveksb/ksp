import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestProcess } from '@ksp/shared/constant';
import {
  KspRequest,
  Province,
  RequestSearchFilter,
  EsSearchPayload,
} from '@ksp/shared/interface';
import {
  ERequestService,
  EducationDetailService,
  AddressService,
} from '@ksp/shared/service';
import {
  checkStatus,
  schoolMapRequestType,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-new-foreign-user-list',
  templateUrl: './new-foreign-user-list.component.html',
  styleUrls: ['./new-foreign-user-list.component.scss'],
})
export class NewForeignUserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<KspRequest>();
  checkStatus = checkStatus;
  statusList = SchoolRequestProcess.find((i) => i.requestType === 1)?.status;
  mapRequestType = schoolMapRequestType;
  bureau$!: Observable<any>;
  searchNotFound = false;
  provinces$!: Observable<Province[]>;

  form = this.fb.group({
    search: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eRequestService: ERequestService,
    private educationDetailService: EducationDetailService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.bureau$ = this.educationDetailService.getBureau();
    this.provinces$ = this.addressService.getProvinces();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: RequestSearchFilter) {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: params.requesttype || '50',
      requestno: params.requestno,
      careertype: null,
      name: params.name,
      idcardno: null,
      passportno: params.passportno,
      process: null,
      status: params.requeststatus,
      schoolid: params.schoolinfo?.schoolid,
      schoolname: params.schoolinfo?.schoolname,
      bureauid: params.schoolinfo?.bureauid,
      requestdatefrom: params.requestdatefrom,
      requestdateto: null,
      offset: '0',
      row: '500',
      isforeign: '1',
    };

    payload = replaceEmptyWithNull(payload);

    this.eRequestService.KspSearchRequest(payload).subscribe((res) => {
      if (res && res.length) {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'requestdate', direction: 'asc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        this.searchNotFound = false;
      } else {
        this.dataSource.data = [];
        this.searchNotFound = true;
      }
    });
  }

  clear() {
    this.dataSource.data = [];
    this.searchNotFound = false;
  }

  goToDetail(id: string | null) {
    this.router.navigate(['self-user', 'new-user-detail', id]);
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
  'requeststatus',
  'requestdate',
];
