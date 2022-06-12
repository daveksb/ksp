import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  educationLevel = ['1.สำเนาผลการปฏิบัติงานตามมาตรฐานการปฏิบัติงาน'];

  testForm = this.fb.group({
    selectValue: [''],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  back() {
    this.router.navigate(['./', 'activity', 'detail']);
  }

  cancel() {
    this.router.navigate(['./', 'activity']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'ตกลง',
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
