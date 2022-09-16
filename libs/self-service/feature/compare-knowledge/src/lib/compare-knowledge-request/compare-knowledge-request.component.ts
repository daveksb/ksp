import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-compare-knowledge-request',
  templateUrl: './compare-knowledge-request.component.html',
  styleUrls: ['./compare-knowledge-request.component.scss'],
})
export class CompareKnowledgeRequestComponent implements OnInit {
  headerGroup = ['วันที่ทำรายการ', 'เลขใบคำขอ'];
  objectiveFiles = [
    '1. สำเนาหลักฐานแสดงวุฒิการศึกษา',
    '2. รูปภาพถ่ายหน้าตรง ขนาด 1.5 x 2   นิ้ว',
  ];
  userInfoType = UserInfoFormType.thai;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'บันทึก',
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
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'home']);
      }
    });
  }
}
