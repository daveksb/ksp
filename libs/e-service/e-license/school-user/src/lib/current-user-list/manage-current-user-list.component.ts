import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  ESchUserSearch,
  SchoolServiceUserPageType,
  SchoolUser,
} from '@ksp/shared/interface';
import { ESchStaffService } from '@ksp/shared/service';

@Component({
  templateUrl: './manage-current-user-list.component.html',
  styleUrls: ['./manage-current-user-list.component.scss'],
})
export class ManageCurrentUserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = columns;
  dataSource = new MatTableDataSource<SchoolUser>();
  selectedUniversity = '';

  constructor(
    private router: Router,
    private schStaffService: ESchStaffService
  ) {}

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
      schoolid: param.institution ? param.institution.schoolid : null, //'0010201056',
      schoolname: param.institution ? param.institution.schoolname : null,
      name: param.name,
      offset: '0',
      row: '500',
    };

    this.schStaffService.SearchSchStaffs(payload).subscribe((res) => {
      if (res && res.length) {
        this.dataSource.data = res;
      } else {
        this.clear();
      }
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  goToDetail(id: number) {
    this.router.navigate(['/school', 'user-detail', id], {
      queryParams: { type: SchoolServiceUserPageType.ManageCurrentUser },
    });
  }
}

export const columns = [
  'id',
  'view',
  'idcardno',
  'name',
  'schoolname',
  //'province',
  'requeststatus',
  'requestdate',
  'updatedate',
];
