import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForbiddenPropertyComponent } from '@ksp/school-service/ui/dialog';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'school-service-license-detail',
  templateUrl: './license-detail.component.html',
  styleUrls: ['./license-detail.component.scss'],
})
export class LicenseDetailComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  back() {
    this.router.navigate(['/', 'temp-license', 'list']);
  }

  next() {
    const dialogRef = this.dialog.open(ForbiddenPropertyComponent, {
      height: '475px',
      width: '850px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
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
        header: `ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`,

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
