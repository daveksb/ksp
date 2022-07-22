import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-test-performance-detail',
  templateUrl: './test-performance-detail.component.html',
  styleUrls: ['./test-performance-detail.component.scss'],
})
export class TestPerformanceDetailComponent implements OnInit {
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
    this.router.navigate(['/', 'performance-data-result', 'list']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
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
  'personId',
  'name',
  'score1',
  'evaluate1',
  'score2',
  'evaluate2',
  'score3',
  'evaluate3',
  'score4',
  'evaluate4',
];
export interface importTest {
  personId: string;
  name: string;
  score1: string;
  score2: string;
  score3: string;
  score4: string;
  evaluate1: string;
  evaluate2: string;
  evaluate3: string;
  evaluate4: string;
}

export const data2: importTest = {
  personId: '3-1020-xXXXX-XX-1',
  name: 'นางสาวกนกวรรณ คล้อยใจตาม',
  score1: '5',
  score2: '5',
  score3: '5',
  score4: '5',
  evaluate1: 'ดีมาก',
  evaluate2: 'ดีมาก',
  evaluate3: 'ดีมาก',
  evaluate4: 'ดีมาก',
};
