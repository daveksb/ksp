import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolServiceUserPageType } from '@ksp/shared/interface';

@Component({
  templateUrl: './approve-new-user-list.component.html',
  styleUrls: ['./approve-new-user-list.component.scss'],
})
export class ApproveNewUserListComponent {
  form = this.fb.group({
    approveSearch: [],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<userList>();

  constructor(private router: Router, private fb: FormBuilder) {}

  selectedUniversity = '';

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  goToDetail() {
    this.router.navigate(['/', 'approve-new-user', 'detail'], {
      queryParams: { type: SchoolServiceUserPageType.ApproveNewUser },
    });
  }
}

export interface userList {
  id: number;
  view: string;
  order: string;
  name: string;
  phone: string;
  authorName: string;
  school: string;
  province: string;
  status: string;
  date: string;
}

export const column = [
  'id',
  'view',
  'order',
  'name',
  'phone',
  'authorName',
  'school',
  'province',
  'status',
  'date',
];

export const data: userList[] = [
  {
    id: 1,
    view: '',
    order: '1234xxxxxxxx',
    name: 'xxx xxxx xxxxxx',
    phone: '098-xxx-xxxx',
    authorName: 'xxx xxxx xxxx',
    school: 'xxxxxx',
    province: 'xxxxxx',
    status: 'รอการอนุมัติ',
    date: 'xx/xx/xxxx',
  },
  {
    id: 2,
    view: '',
    order: '1234xxxxxxxx',
    name: 'xxx xxxx xxxxxx',
    phone: '098-xxx-xxxx',
    authorName: 'xxx xxxx xxxx',
    school: 'xxxxxx',
    province: 'xxxxxx',
    status: 'รอการอนุมัติ',
    date: 'xx/xx/xxxx',
  },
];
