import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ksp-forgot-password-set-new-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forgot-password-set-new-password.component.html',
  styleUrls: ['./forgot-password-set-new-password.component.scss'],
})
export class ForgotPasswordSetNewPasswordComponent {
  constructor(public dialog: MatDialog) {}

  cancel() {
    this.dialog.closeAll();
  }

  nextStep() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `ไม่พบข้อมูลของท่านในระบบ`,
        subTitle: `กรุณาเลือกตรวจสอบอีกครั้งเพื่อตรวจสอบ
          หรือยกเลิกหากท่านไม่ต้องการทำรายการต่อ`,
        btnLabel: `ตรวจสอบอีกครั้ง`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
