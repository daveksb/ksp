import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HistoryRequestDialogComponent } from '@ksp/uni-service/dialog';

@Component({
  selector: 'ksp-edit-student-list',
  templateUrl: './edit-student-list.component.html',
  styleUrls: ['./edit-student-list.component.scss'],
})
export class EditStudentListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<studentList>();

  constructor(private router: Router, public dialog: MatDialog) {}

  history() {
    this.dialog.open(HistoryRequestDialogComponent, {
      width: '400px',
    });
  }

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  create() {
    this.router.navigate(['/', 'edit-student-list', 'detail']);
  }
}

export const column = [
  'order',
  'requestId',
  'submitDate',
  'personId',
  'name',
  'degreeCode',
  'university',
  'degreeName',
  'major',
  'verifyStatus',
  'editDate',
  'edit',
  'print',
];

export interface studentList {
  order: number;
  requestId: string;
  submitDate: string;
  personId: string;
  name: string;
  degreeCode: string;
  university: string;
  degreeName: string;
  major: string;
  verifyStatus: string;
  editDate: string;
}

export const data: studentList[] = [
  {
    order: 1,
    requestId: 'string',
    submitDate: 'string',
    personId: 'string',
    name: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    verifyStatus: 'สร้าง',
    editDate: 'string',
  },
  {
    order: 2,
    requestId: 'string',
    submitDate: 'string',
    personId: 'string',
    name: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    verifyStatus: 'ยื่นเรียบร้อย',
    editDate: 'string',
  },
  {
    order: 3,
    requestId: 'string',
    submitDate: 'string',
    personId: 'string',
    name: 'string',
    degreeCode: 'string',
    university: 'string',
    degreeName: 'string',
    major: 'string',
    verifyStatus: 'รับข้อมูล',
    editDate: 'string',
  },
];
