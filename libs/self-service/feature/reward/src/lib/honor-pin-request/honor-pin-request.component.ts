import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-honor-pin-request',
  templateUrl: './honor-pin-request.component.html',
  styleUrls: ['./honor-pin-request.component.scss'],
})
export class HonorPinRequestComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล ใช่หรือไม่? `,
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
        header: `ลงทะเบียนรายงานตัวเพื่อยืนยันเข้าเฝ้า
        รับเข็มเชิดชูเกียรติตัวสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'reward', 'list']);
      }
    });
  }
}
