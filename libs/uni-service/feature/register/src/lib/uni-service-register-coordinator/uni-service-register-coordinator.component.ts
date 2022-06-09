import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';
import { UniversitySearchComponent } from '@ksp/shared/form/university-search';

@Component({
  selector: 'uni-service-register-coordinator',
  templateUrl: './uni-service-register-coordinator.component.html',
  styleUrls: ['./uni-service-register-coordinator.component.scss'],
})
export class UniServiceRegisterCoordinatorComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  registerFiles = ['หนังสือแต่งตั้งผู้ประสานงาน', 'สำเนาบัตรประชาชน'];

  search() {
    const dialogRef = this.dialog.open(UniversitySearchComponent, {
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  prevPage() {
    this.router.navigate(['/', 'register', 'requester']);
  }

  cancel() {
    this.router.navigate(['/', 'login']);
  }

  submit() {
    // will do later
  }

  confirm() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
      },
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
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : 10 ตุลาคม 2565
        เลขที่ใบคำขอ : 12234467876543 `,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
          ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วัน`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'login']);
      }
    });
  }
}
