import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolServiceUserPageType } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  checkComponentTitles = ['ผลการตรวจสอบ', 'สถานะการใช้งาน'];
  checkComponentChoices = [
    ['อนุมัติ', 'ไม่อนุมัติ'],
    ['ใช้งาน', 'ไม่ใช้งาน'],
  ];

  pageType = 0;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      //console.log('res = ', this.pageType);
    });
  }

  cancel() {
    if (this.pageType === SchoolServiceUserPageType.ApproveNewUser) {
      this.router.navigate(['/', 'approve-new-user']);
    } else if (this.pageType === SchoolServiceUserPageType.ManageCurrentUser) {
      this.router.navigate(['/', 'manage-current-user']);
    }
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่? `,
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
        header: `บันทึกข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        if (this.pageType === SchoolServiceUserPageType.ApproveNewUser) {
          this.router.navigate(['/', 'user-approvement']);
        } else if (
          this.pageType === SchoolServiceUserPageType.ManageCurrentUser
        ) {
          this.router.navigate(['/', 'user-management']);
        }
      }
    });
  }
}
