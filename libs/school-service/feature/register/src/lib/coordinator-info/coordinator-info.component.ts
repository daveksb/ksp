import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'school-service-author',
  templateUrl: './coordinator-info.component.html',
  styleUrls: ['./coordinator-info.component.scss'],
})
export class CoordinatorInfoComponent {
  uploadFileList = ['หนังสือแต่งตั้งผู้ประสานงาน', 'สำเนาบัตรประชาชน'];

  constructor(private router: Router, public dialog: MatDialog) {}

  navigateBack() {
    this.router.navigate(['/', 'login']);
  }

  back() {
    this.router.navigate(['/', 'register', 'register']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม`,
        schoolCode: 'รหัสเข้าใช้งาน(รหัสโรงเรียน): xxxx',
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.showCompleteDialog();
      }
    });
  }

  showCompleteDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : 10 ตุลาคม  2565
        เลขที่ใบคำขอ : 12234467876543`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอผ่านทางอีเมล
        ผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.navigateBack();
      }
    });
  }
}
