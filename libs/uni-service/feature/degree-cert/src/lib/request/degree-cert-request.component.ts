import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { getCookie } from '@ksp/shared/utility';

@Component({
  templateUrl: './degree-cert-request.component.html',
  styleUrls: ['./degree-cert-request.component.scss'],
})
export class DegreeCertRequestComponent {
  @ViewChild('stepper') private stepper?: MatStepper;

  step1DegreeType = '';

  step1Form = this.fb.group({
    step1: [{}, Validators.required],
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
  ) {
    this.initForm();
  }
  initForm() {
    this.step1Form.setValue({
      step1: {
        institutionsCode: '3',
        institutionsGroup: getCookie('uniType') || "",
        institutionsName: '2q234',
        provience: '71',
      },
    });
  }
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
  goBack() {
    this.stepper?.previous();
  }

  goForward() {
    console.log('step1Form', this.step1Form.value);
    console.log('step2Form', this.step2Form.value);
    console.log('step3Form', this.step3Form.value);

    this.stepper?.next();
  }
}
