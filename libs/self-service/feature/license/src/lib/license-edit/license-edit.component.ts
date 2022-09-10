import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'self-service-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.css'],
})
export class LicenseEditComponent implements OnInit {
  form = this.fb.group({
    prefixTh: [],
    prefixEn: [],
    nameTh: [],
    nameEn: [],
    lastnameTh: [],
    lastnameEn: [],
    distributeData: [],
  });

  uploadFileList = [
    'สำเนาหนังสือสำคัญการเปลี่ยนชื่อ/ชื่อสกุล/เปลี่ยนหรือเพิ่มคำนำหน้าชื่อ',
    'สำเนาหลักฐานการสมรส หรือการสิ้นสุดการสมรส (ถ้ามี)',
    'สำเนาหนังสือรับรองการใช้คำหน้านามหญิง (ถ้ามี)',
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form.disable();
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //
    });
  }

  disableControl(evt: any, controlList: controlName[]) {
    const checked = evt.target.checked;
    controlList.forEach((i) => {
      if (checked) {
        this.form.controls[i].enable();
      } else {
        this.form.controls[i].disable();
      }
    });
  }

  navigateBack() {
    this.router.navigate(['/', 'home']);
  }

  onConfirm() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
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
    const dialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลและยื่นใบคำขอสำเร็จเรียบร้อย`,
        content: `วันที่ : 22 พฤศจิกายน 2565
        เลขที่ใบคำขอ : SF_ED_12234467876543 `,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
          ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });
    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.navigateBack();
      }
    });
  }
}

export type controlName =
  | 'prefixTh'
  | 'prefixEn'
  | 'nameTh'
  | 'nameEn'
  | 'lastnameTh'
  | 'lastnameEn'
  | 'distributeData';
