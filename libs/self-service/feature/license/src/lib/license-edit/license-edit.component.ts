import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

export type controlName = 'nameTh' | 'nameEng' | 'prefixTh' | 'prefixEng';

@Component({
  selector: 'self-service-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.css'],
})
export class LicenseEditComponent implements OnInit {
  editPrefixCheck = false;
  editNameCheck = false;
  editLastnameCheck = false;
  distributeCheck = false;

  form = this.fb.group({
    prefixTh: [],
    prefixEng: [],
    nameTh: [],
    nameEng: [],
    lastnameTh: [],
    lastnameEng: [],
    distributeData: [],
  });

  uploadFileList = [
    'สำเนาหนังสือสำคัญการเปลี่ยนชื่อ/ชื่อสกุล/เปลี่ยนหรือเพิ่มคำนำหน้าชื่อ',
    'สำเนาหลักฐานการสมรส หรือการสิ้นสุดการสมรส (ถ้ามี)',
    'สำเนาหนังสือรับรองการใช้คำหน้านามหญิง (ถ้ามี)',
  ];

  disableControlA(evt: any, controlNames: controlName[]) {
    const status = evt.target.checked;

    controlNames.forEach((i) => {
      console.log('i = ', i);
      if (status) {
        this.form.controls[i].enable();
      } else {
        this.form.controls[i].disable();
      }
    });
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      ///console.log('res = ', res);
    });
    this.form.disable();
  }

  cancel() {
    this.router.navigate(['/', 'license', 'request']);
  }

  onConfirm() {
    console.log('edit prefix check = ', this.editPrefixCheck);
    /* const dialog = this.dialog.open(ConfirmDialogComponent, {
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
    }); */
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
        this.router.navigate(['/', 'license', 'request']);
      }
    });
  }
}
