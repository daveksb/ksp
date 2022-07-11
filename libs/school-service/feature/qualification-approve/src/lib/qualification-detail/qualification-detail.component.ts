import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  QualificationApproveDetailComponent,
  QualificationApprovePersonComponent,
} from '@ksp/shared/form/others';

@Component({
  selector: 'ksp-qualification-detail',
  templateUrl: './qualification-detail.component.html',
  styleUrls: ['./qualification-detail.component.scss'],
})
export class QualificationDetailComponent {
  evidenceFiles = [
    'หนังสือนำส่งจากหน่วยงานผู้ใช้',
    'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    'สำเนาทะเบียนบ้าน',
    'สำเนา กพ.7 / สมุดประจำตัว',
    'สำเนาหนังสือแจ้งการเทียบคุณวุฒิ (กรณีจบการศึกษาจากต่างประเทศ)',
    'สำเนาหลักฐานการเปลี่ยนชื่อ นามสกุล',
    'เอกสารอื่นๆ',
  ];

  constructor(public dialog: MatDialog, private router: Router) {}

  save() {
    const confirmDialog = this.dialog.open(
      QualificationApproveDetailComponent,
      {
        width: '850px',
      }
    );

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.saved();
      }
    });
  }

  saved() {
    const completeDialog = this.dialog.open(
      QualificationApprovePersonComponent,
      {
        width: '850px',
      }
    );

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
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
        header: `ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'temp-license', 'list']);
      }
    });
  }
}
