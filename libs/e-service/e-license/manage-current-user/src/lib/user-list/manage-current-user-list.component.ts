import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolServiceUserPageType } from '@ksp/shared/interface';

@Component({
  templateUrl: './manage-current-user-list.component.html',
  styleUrls: ['./manage-current-user-list.component.scss'],
})
export class ManageCurrentUserListComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<userList>();

  constructor(private router: Router) {}

  selectedUniversity = '';

  data = [];

  ngOnInit(): void {
    this.data = [];
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  goToDetail() {
    this.router.navigate(['/', 'manage-current-user', 'detail'], {
      queryParams: { type: SchoolServiceUserPageType.ManageCurrentUser },
    });
  }
}

export const column = [
  'id',
  'view',
  'ssn',
  'name',
  'school',
  'province',
  'status',
  'approveDate',
  'editDate',
];
export interface userList {
  id: number;
  view: string;
  ssn: string;
  name: string;
  school: string;
  province: string;
  status: string;
  approveDate: string;
  editDate: string;
}

export const data: userList[] = [
  {
    id: 1,
    view: '',
    ssn: '1234xxxxxxxx',
    name: 'xxx xxxx xxxxxx',
    school: '098-xxx-xxxx',
    province: 'xxx xxxx xxxx',
    status: 'xxxxxx',
    approveDate: 'xx/xx/xxxx',
    editDate: 'xx/xx/xxxx',
  },
  {
    id: 2,
    view: '',
    ssn: '1234xxxxxxxx',
    name: 'xxx xxxx xxxxxx',
    school: '098-xxx-xxxx',
    province: 'xxx xxxx xxxx',
    status: 'xxxxxx',
    approveDate: 'xx/xx/xxxx',
    editDate: 'xx/xx/xxxx',
  },
];
