import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  templateUrl: './degree-cert-request.component.html',
  styleUrls: ['./degree-cert-request.component.scss'],
})
export class DegreeCertRequestComponent {
  step1DegreeType = '';

  step1Form = this.fb.group({
    step1: ['', Validators.required],
  });
  step2Form = this.fb.group({
    step2: ['', Validators.required],
  });
  step3Form = this.fb.group({
    step3: ['', Validators.required],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  navigateBack() {
    this.router.navigate(['/', 'degree-cert']);
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.showConfirmDialog();
      }
    });
  }

  showConfirmDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : 12 มกราคม 2565?
        เลขที่ใบคำขอ : UNIUS 6406000162`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.navigateBack();
      }
    });
  }
  onSubmit() {
    console.log(this.step1Form.value);
  }
}
