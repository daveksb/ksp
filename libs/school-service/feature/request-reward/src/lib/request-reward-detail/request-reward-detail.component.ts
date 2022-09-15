import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-request-reward-detail',
  templateUrl: './request-reward-detail.component.html',
  styleUrls: ['./request-reward-detail.component.scss'],
})
export class RequestRewardDetailComponent {
  form = this.fb.group({
    reward: [],
  });

  rewards = rewards;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  cancel() {
    this.router.navigate(['/temp-license', 'list']);
  }

  save(form: any) {
    console.log('form = ', form.reward);
    /*     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    }); */
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ระบบทำการบันทึก
        และส่งเรื่องให้เเจ้าหน้าที่เรียบร้อยแล้ว`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
}

export const rewards = [
  { label: 'ไม่เคยส่งเข้ารับการคัดสรรกับคุรุสภา', value: 1 },
  {
    label: 'เคยส่งเข้ารับการคัดสรรกับคุรุสภา แต่ไม่ได้รับรางวัลของคุรุสภา',
    value: 2,
  },
  {
    label: 'ได้รับรางวัลของคุรุสภา แต่มีการพัฒนาต่อยอดนวัตกรรม',
    value: 3,
  },
];
