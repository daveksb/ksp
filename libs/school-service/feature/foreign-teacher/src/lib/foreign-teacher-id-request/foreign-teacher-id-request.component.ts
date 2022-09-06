import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormMode } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './foreign-teacher-id-request.component.html',
  styleUrls: ['./foreign-teacher-id-request.component.scss'],
})
export class ForeignTeacherIdRequestComponent implements OnInit {
  form = this.fb.group({
    foreignTeacher: [],
  });

  @Input() mode: FormMode = 'edit';
  foreignInfo = ['1.สำเนาหนังสือเดินทาง'];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      console.log('res = ', res);
    });
  }

  cancel() {
    this.router.navigate(['/', 'temp-license']);
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
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
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'temp-license', 'list']);
      }
    });
  }
}
