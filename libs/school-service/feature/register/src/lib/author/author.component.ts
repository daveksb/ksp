import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'school-service--author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  cancel() {
    this.router.navigate(['/', 'login']);
  }

  back() {
    this.router.navigate(['/', 'register', 'register']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม`,
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
      height: '300px',
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : 10 ตุลาคม  2565
        เลขที่ใบคำขอ : 12234467876543`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอผ่านทางอีเมล
        ผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,

        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'login']);
      }
    });
  }
}
