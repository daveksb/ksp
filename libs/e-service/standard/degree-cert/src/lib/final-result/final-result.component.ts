import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';

@Component({
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss'],
})
export class FinalResultComponent {
  form = this.fb.group({
    finalResult: [],
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  cancel() {
    this.router.navigate(['/', 'degree-cert', 'list', '0']);
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันรหัสรับรองปริญญา
        และประกาศนียบัตรทางการศึกษา ใช่หรือไม่`,
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'ระบบสร้างรหัส',
        subTitle: `รับรองปริญญา และประกาศนียบัตร
        ทางการศึกษาเรียบร้อย ตรวจสอบข้อมูลได้ที่`,
        schoolCode: `"ทะเบียนปริญญา
        และประกาศนียบัตรทางการศึกษา"`,
      },
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert', 'list', '0']);
      }
    });
  }
}
