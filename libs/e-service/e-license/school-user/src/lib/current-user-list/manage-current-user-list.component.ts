import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  ESchUserSearch,
  SchoolUserPageType,
  SchUser,
} from '@ksp/shared/interface';
import { EducationDetailService, ESchStaffService } from '@ksp/shared/service';
import { mapSchUserStatus, schoolMapRequestType } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './manage-current-user-list.component.html',
  styleUrls: ['./manage-current-user-list.component.scss'],
})
export class ManageCurrentUserListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = columns;
  dataSource = new MatTableDataSource<SchUser>();
  selectedUniversity = '';
  mapSchUserStatus = mapSchUserStatus;
  mapRequestType = schoolMapRequestType;
  searchNotFound = false;
  bureau$!: Observable<any>;

  constructor(
    private router: Router,
    private schStaffService: ESchStaffService,
    private educationDetailService: EducationDetailService
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
    //console.log('params = ', param);
    const payload = {
      schoolid: param.institution ? param.institution.schoolid : null,
      schoolname: param.institution ? param.institution.schoolname : null,
      name: param.name,
      offset: '0',
      row: '500',
    };

    this.schStaffService.searchSchStaffs(payload).subscribe((res) => {
      if (res && res.length) {
        this.searchNotFound = false;
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'schmemberid', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
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
