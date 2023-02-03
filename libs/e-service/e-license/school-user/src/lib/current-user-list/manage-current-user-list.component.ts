import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  ESchUserSearch,
  SchoolUserPageType,
  SchUser,
} from '@ksp/shared/interface';
import { EducationDetailService, ESchStaffService, LoaderService } from '@ksp/shared/service';
import { mapSchUserStatus, schoolMapRequestType } from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  templateUrl: './manage-current-user-list.component.html',
  styleUrls: ['./manage-current-user-list.component.scss'],
})
export class ManageCurrentUserListComponent implements AfterViewInit, OnInit {
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

  constructor(
    private router: Router,
    private schStaffService: ESchStaffService,
    private educationDetailService: EducationDetailService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.bureau$ = this.educationDetailService.getBureau();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  search(param: ESchUserSearch) {
    console.log('params = ', param);
    const payload = {
      schoolid: param.institution ? param.institution.schoolid : null,
      schoolname: param.institution ? param.institution.schoolname : null,
      name: param.name,
      schuseractive: param.status,
      idcardno: param.personId,
      offset: '0',
      row: '500',
    };

    this.schStaffService.searchSchStaffs(payload).subscribe((res) => {
      if (res && res.length) {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'schmemberid', direction: 'desc' };
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

  goToDetail(id: number) {
    this.router.navigate(['/school', 'user-detail', id], {
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
