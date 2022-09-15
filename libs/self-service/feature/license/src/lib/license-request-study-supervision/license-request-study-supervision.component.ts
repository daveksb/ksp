import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';

@Component({
  selector: 'ksp-license-request-study-supervision',
  templateUrl: './license-request-study-supervision.component.html',
  styleUrls: ['./license-request-study-supervision.component.scss'],
})
export class LicenseRequestStudySupervisionComponent implements OnInit {
  experienceFiles = [
    {
      name: '1. สำเนาวุฒิทางการศึกษา',
      fileId: '',
    },
    {
      name: '2. เอกสารผู้สำเร็จการศึกษา ( ระบบ KSP BUNDIT)',
      fileId: '',
    },
    {
      name: '3. วุฒิบัตรอบรม',
      fileId: '',
    },
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
        this.router.navigate(['/', 'renew-license', 'request']);
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'license', 'payment-channel']);
      }
    });
  }
}
