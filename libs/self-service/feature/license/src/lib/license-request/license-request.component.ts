import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';

@Component({
  templateUrl: './license-request.component.html',
  styleUrls: ['./license-request.component.css'],
})
export class LicenseRequestComponent implements OnInit {
  form = this.fb.group({
    address1: [],
    address2: [],
  });

  educationFiles = [
    'สำเนาใบรายงานผลการศึกษา (Transcript)',
    'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
  ];

  experienceFiles = [
    'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง',
    'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
    'สำเนาตารางสอนรายสัปดาห์',
    'สำเนาคำสั่งแต่งตั้งปฏิบติหน้าที่',
    'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
  ];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form.controls.address1.valueChanges.subscribe((res) => {
      console.log('res = ', res);
    });
  }

  save() {
    const confirmDialog = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '900px',
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่?`,
        btnLabel: 'ยื่นแบบคำขอ',
        cancelBtnLabel: 'บันทึก',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'license', 'request']);
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'license', 'payment-channel']);
      }
    });
  }
}
