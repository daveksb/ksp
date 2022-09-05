import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-refund-fee-request',
  templateUrl: './refund-fee-request.component.html',
  styleUrls: ['./refund-fee-request.component.scss'],
})
export class RefundFeeRequestComponent implements OnInit {
  refundInfo = ['1.สำเนาวุฒิการศึกษา'];
  headerGroup = ['วันที่ทำรายการ', 'เลขใบคำขอ'];
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
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
      width: '375px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'home']);
      }
    });
  }
}
