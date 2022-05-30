import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss'],
})
export class StepFiveComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '1']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'step-4']);
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลผลการตรวจสอบ
        ใช่หรือไม่`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      height: '250px',
      width: '350px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',

        subContent: `ระบบส่งใบคำขอเพื่อพิจารณาประเมินหลักสูตร
        เรียบร้อย`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        
        this.router.navigate(['/', 'degree-cert', 'list', '1']);
      }
    });
  }
}
