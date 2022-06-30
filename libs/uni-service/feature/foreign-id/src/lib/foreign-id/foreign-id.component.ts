import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormMode } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'uni-service-foreign-id',
  templateUrl: './foreign-id.component.html',
  styleUrls: ['./foreign-id.component.css'],
})
export class ForeignIdComponent {
  @Input() mode: FormMode = 'edit';
  foreignInfo = ['1.สำเนาหนังสือเดินทาง'];

  form = this.fb.group({
    foreignStudent: [],
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
      //console.log(`Dialog result: ${result}`);
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
