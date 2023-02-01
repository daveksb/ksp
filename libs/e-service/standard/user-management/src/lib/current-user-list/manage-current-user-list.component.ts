import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  ESchUserSearch,
  KspPaginationComponent,
  ListData,
  SchoolUserPageType,
  SchUser,
} from '@ksp/shared/interface';
import { EducationDetailService, ESchStaffService, EUniService, LoaderService, UniInfoService } from '@ksp/shared/service';
import { mapSchUserStatus, replaceEmptyWithNull, schoolMapRequestType, thaiDate } from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  templateUrl: './manage-current-user-list.component.html',
  styleUrls: ['./manage-current-user-list.component.scss'],
})
export class ManageCurrentUserListComponent extends KspPaginationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = columns;
  dataSource = new MatTableDataSource<SchUser>();
  selectedUniversity = '';
  mapSchUserStatus = mapSchUserStatus;
  mapRequestType = schoolMapRequestType;
  searchNotFound = false;
  bureau$!: Observable<any>;

  activeStatusList = [
    { id: 0, label: 'ไม่ใช้งาน' },
    { id: 1, label: 'ใช้งาน' },
  ];

  form = this.fb.group({
    search: [],
  });
  payload: any;
  uniUniversityTypeOption$!: Observable<any>;

  constructor(
    private router: Router,
    private schStaffService: ESchStaffService,
    private educationDetailService: EducationDetailService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private eUniService: EUniService,
    private uniInfoService: UniInfoService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.uniUniversityTypeOption$ = this.uniInfoService.getUniversityType();
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  handleSearch(params: any) {
    console.log(params)
    const payload = {
      unitype: params.institution ? params.institution.bureauid : null,
      universitycode: params.institution ? params.institution.schoolid : null,
      uniname: params.institution ? params.institution.schoolname : null,
      name: params.name,
      isuseractive: params.status,
      idcardno: params.personId
    };
    this.payload = replaceEmptyWithNull(payload);
    this.search();
  }

  override search() {
    // console.log('params = ', param);
    this.payload = { ...this.payload, ...this.tableRecord };
    this.eUniService.searchUniUser(this.payload).subscribe((res) => {
      if (res && res.datareturn) {
        this.pageEvent.length = res.countrow;
        this.dataSource.data = res.datareturn.map((data: any) => {
          data.uniname = `${data.uniname}${data.campusname ? ', ' + data.campusname : ''}`;
          return data;
        });
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

  goToDetail(id: number) {
    this.router.navigate(['/uni', 'user-detail', id], {
      queryParams: { type: SchoolUserPageType.CurrentUser },
    });
  }
}

export const columns = [
  'id',
  'view',
  'idcardno',
  'name',
  'schoolname',
  'province',
  'requeststatus',
  'requestdate',
  //'updatedate',
];
