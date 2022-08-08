import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-edit-student-detail',
  templateUrl: './edit-student-detail.component.html',
  styleUrls: ['./edit-student-detail.component.scss'],
})
export class EditStudentDetailComponent {
  form = this.fb.group({
    editStudent: [],
  });

  uploadFileList = [
    'สำเนาหนังสือสำคัญการเปลี่ยนชื่อ / ชื่อสกุล / เปลี่ยนหรือเพิ่มคำนำหน้าชื่อ',
    'สำเนาหลักฐานการสมรส หรือการสิ้นสุดการสมรส (ถ้ามี)',
    'สำเนาหนังสือรับรองการใช้คำหน้านามหญิง (ถ้ามี)',
  ];

  data = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}



  searchData() {
    this.data = true;
  }

  clearData() {
    this.data = false;
  }

  cancel() {
    this.router.navigate(['/', 'edit-student-list', 'list']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขอนุมัติ
        ใช่หรือไม่`,
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
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : 12 มกราคม 2565
        เลขที่ใบคำขอ : UNIUS 6406000162`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
}
