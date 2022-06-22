import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'self-service-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.css'],
})
export class LicenseEditComponent {
  uploadFileList = [
    'สำเนาหนังสือสำคัญการเปลี่ยนชื่อ/ชื่อสกุล/เปลี่ยนหรือเพิ่มคำนำหน้าชื่อ',
    'สำเนาหลักฐานการสมรส หรือการสิ้นสุดการสมรส (ถ้ามี)',
    'สำเนาหนังสือรับรองการใช้คำหน้านามหญิง (ถ้ามี)',
  ];

  constructor(public dialog: MatDialog) {}

  onConfirm() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '375px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่`,
        subTitle: `คุณต้องการบันทึกข้อมูลและยื่นใบคำขอใช่หรือไม่`,
        cancelBtnLabel: 'บันทึก',
        btnLabel: 'ยื่นแบบคำขอ',
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onSaveAndRequest();
      }
    });
  }

  onSaveAndRequest() {
    this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลและยื่นใบคำขอสำเร็จเรียบร้อย`,
        content: `วันที่ : 22 พฤศจิกายน 2565
        เลขที่ใบคำขอ : SF_ED_12234467876543 `,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
          ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });
  }
}
