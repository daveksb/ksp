import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'school-service-add-staff-teaching-info',
  templateUrl: './add-staff-teaching-info.component.html',
  styleUrls: ['./add-staff-teaching-info.component.scss'],
})
export class AddStaffTeachingInfoComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  back() {
    this.router.navigate(['./', 'staff-management', 'staff-person-info']);
  }

  cancel() {
    this.router.navigate(['./', 'staff-management']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '175px',
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
      height: '200px',
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'staff-management']);
      }
    });
  }
}
