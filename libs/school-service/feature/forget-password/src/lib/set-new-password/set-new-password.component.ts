import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'school-service-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
})
export class SetNewPasswordComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  cancel() {
    this.router.navigate(['/', 'login']);
  }

  accept() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '175px',
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
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
      height: '250px',
      width: '350px',
      data: {
        header: `ทำรายการสำเร็จ`,
        subContent: `ระบบได้ทำการเปลี่ยนรหัสผ่านให้ท่านเรียบร้อยแล้ว
        กรุณาเข้าสู่ระบบใหม่อีกครั้ง`,
        buttonLabel: 'เข้าสู่ระบบ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'login']);
      }
    });
  }
}
