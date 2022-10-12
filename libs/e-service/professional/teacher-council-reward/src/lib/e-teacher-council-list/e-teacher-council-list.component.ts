import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-e-teacher-council-list',
  templateUrl: './e-teacher-council-list.component.html',
  styleUrls: ['./e-teacher-council-list.component.scss'],
})
export class ETeacherCouncilListComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<userList>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  view() {
    this.router.navigate(['/teacher-council', 'detail']);
  }
}

export interface userList {
  order: number;
  licenseNumber: string;
  schoolCode: string;
  schoolName: string;
  workName: string;
  consider: string;
  lastEditDate: string;
  submitDate: string;
  objection: string;
}

export const column = [
  'order',
  'licenseNumber',
  'schoolCode',
  'schoolName',
  'workName',
  'consider',
  'lastEditDate',
  'submitDate',
  'objection',
  'verify',
  'request',
  'edit',
];

export const data: userList[] = [
  {
    order: 1,
    licenseNumber: 'xxx',
    schoolCode: '1234xxxxxxxx',
    schoolName: 'xxx xxxx xxxxxx',
    workName: '098-xxx-xxxx',
    consider: 'xxx xxxx xxxx',
    lastEditDate: 'xxxxxx',
    submitDate: 'xxxxxx',
    objection: 'รอการอนุมัติ',
  },
  {
    order: 2,
    licenseNumber: 'xxx',
    schoolCode: '1234xxxxxxxx',
    schoolName: 'xxx xxxx xxxxxx',
    workName: '098-xxx-xxxx',
    consider: 'xxx xxxx xxxx',
    lastEditDate: 'xxxxxx',
    submitDate: 'xxxxxx',
    objection: 'รอการอนุมัติ',
  },
];
