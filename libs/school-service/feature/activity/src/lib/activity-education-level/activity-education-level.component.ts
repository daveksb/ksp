import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'ksp-activity-education-level',
  templateUrl: './activity-education-level.component.html',
  styleUrls: ['./activity-education-level.component.scss'],
})
export class ActivityEducationLevelComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  back() {
    this.router.navigate(['./', 'activity', 'detail']);
  }

  cancel() {
    this.router.navigate(['./', 'activity']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '175px',
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
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
      height: '200px',
      width: '350px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,

        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'activity']);
      }
    });
  }
}
