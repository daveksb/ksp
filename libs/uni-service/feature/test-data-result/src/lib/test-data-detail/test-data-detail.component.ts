import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-test-data-detail',
  templateUrl: './test-data-detail.component.html',
  styleUrls: ['./test-data-detail.component.scss'],
})
export class TestDataDetailComponent implements OnInit {
  data: importTest[] = [data2];
  dataSource = new MatTableDataSource<importTest>();
  displayedColumns: string[] = displayedColumns;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  search() {
    for (let index = 0; index < 3; index++) {
      this.data = [...this.data, data2];
    }
    this.dataSource.data = this.data;
  }

  cancel() {
    this.router.navigate(['/', 'test-data-result']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
}

const displayedColumns: string[] = [
  'select',
  'year',
  'subjectCode',
  'subjectName',
  'personId',
  'name',
  'fullScore',
  'score',
  'testResult',
  'testStatus',
  'annouceDate',
  'validDate',
];
export interface importTest {
  year: string;
  subjectCode: string;
  subjectName: string;
  personId: string;
  name: string;
  fullScore: string;
  score: string;
  testResult: string;
  testStatus: string;
  annouceDate: string;
  validDate: string;
}

export const data2: importTest = {
  year: '2564',
  subjectCode: '101',
  subjectName: 'วิชาชีพครู',
  personId: '3-1020-xXXXX-XX-1',
  name: 'นางสาวมาลัย ซ่อนกลิ่น',
  fullScore: '70',
  score: '70',
  testResult: 'ผ่าน',
  testStatus: 'มาสอบ',
  annouceDate: '01/02/2564',
  validDate: '01/02/2568',
};
