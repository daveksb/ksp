import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'uni-service-req-foreign-id',
  templateUrl: './req-foreign-id.component.html',
  styleUrls: ['./req-foreign-id.component.css'],
})
export class ReqForeignIdComponent {
  foreignFiles = ['สำเนาหนังสือเดินทาง'];

  constructor(public dialog: MatDialog, private router: Router) {}

  cancel() {
    this.router.navigate(['/', 'home']);
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
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
      width: '350px',
      data: {
        header: 'บันทึกข้อมูลสำเร็จ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'home']);
      }
    });
  }
}
