import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-substitute-license-detail',
  templateUrl: './substitute-license-detail.component.html',
  styleUrls: ['./substitute-license-detail.component.scss'],
})
export class SubstituteLicenseDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;
  objectiveFiles = [
    '1.ใบอนุญาตประกอบวิชาชีพที่ชํารุด',
    '2.หลักฐานการรับแจงความของพนักงานสอบสวน หรือบันทึกถอยคํา กรณีใบอนุญาตสูญหาย',
  ];
  
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  next() {
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
      this.router.navigate(['/license', 'request']);
    }
  });

  completeDialog.componentInstance.confirmed.subscribe((res) => {
    if (res) {
      this.router.navigate(['/license', 'payment-channel']);
    }
  });


}
}
