import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';

@Component({
  selector: 'ksp-renew-license-study-supervision',
  templateUrl: './renew-license-study-supervision.component.html',
  styleUrls: ['./renew-license-study-supervision.component.scss'],
})
export class RenewLicenseStudySupervisionComponent implements OnInit {
  headerGroup = [
    'วันที่ทำรายการ',
    'เลขใบคำขอ',
    'เลขที่ใบอนุญาต',
    'เลขที่ประจำตัวคุรุสภา',
    'เลขประจำตัวประชาชน',
    'วันที่ออกใบอนุญาต',
    'วันที่หมดอายุใบอนุญาต',
  ];

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

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
        title: `คุณต้องการบันทึกข้อมูลใช่หรือไม่?`,
        btnLabel: 'ยื่นแบบคำขอ',
        cancelBtnLabel: 'บันทึก',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'home']);
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'license', 'payment-channel']);
      }
    });
  }
}
