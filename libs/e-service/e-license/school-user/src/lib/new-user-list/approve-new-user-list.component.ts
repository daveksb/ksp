import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestProcess } from '@ksp/shared/constant';
import {
  EsSearchPayload,
  KspRequest,
  Province,
  RequestSearchFilter,
  SchoolUserPageType,
} from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  LoaderService,
} from '@ksp/shared/service';
import {
  checkStatus,
  parseJson,
  replaceEmptyWithNull,
  schoolMapRequestType,
} from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  templateUrl: './approve-new-user-list.component.html',
  styleUrls: ['./approve-new-user-list.component.scss'],
})
export class ApproveNewUserListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  requestTypeLabel = 'ผู้แต่งตั้ง';
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<KspRequest>();
  checkStatus = checkStatus;
  statusList = SchoolRequestProcess.find((i) => i.requestType === 1)?.status;
  mapRequestType = schoolMapRequestType;
  selectedUniversity = '';
  bureau$!: Observable<any>;
  searchNotFound = false;
  defaultForm = { requesttype: '1' };
  provinces$!: Observable<Province[]>;
  form = this.fb.group({
    search: [this.defaultForm],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eRequestService: ERequestService,
    private educationDetailService: EducationDetailService,
    private loaderService: LoaderService,
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
    //console.log('params  = ', params);
    if (params.requesttype === '2') {
      this.requestTypeLabel = 'ผู้ถอดถอน';
    } else {
      this.requestTypeLabel = 'ผู้แต่งตั้ง';
    }

    let payload: EsSearchPayload = {
      systemtype: '2',
      requesttype: params.requesttype || '1',
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
      if (res && res.length) {
        const data = res.map((i) => {
          const coordinator = JSON.parse(i.coordinatorinfo || '{}');
          return {
            ...i,
            ...{
              province: JSON.parse(i.schooladdrinfo || '{}'),
              coordinator:
                coordinator?.firstnameth + ' ' + coordinator?.lastnameth,
            },
          };
        });
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'requestdate', direction: 'asc' };
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

  clear() {
    this.dataSource.data = [];
    this.searchNotFound = false;
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
  }

  goToDetail(id: number) {
    this.router.navigate(['school', 'user-detail', id], {
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
  'provience',
  'requestType',
  'requeststatus',
  'requestdate',
];
