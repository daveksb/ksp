import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'e-service-accusation-decision',
  templateUrl: './accusation-decision.component.html',
  styleUrls: ['./accusation-decision.component.scss'],
})
export class AccusationDecisionComponent {
  decisions = decisions;
  today = thaiDate(new Date());
  form = this.fb.group({
    decisions: [],
    otherDetail: [],
  });
  requestNumber = '';
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  @Input() hideAllButtons = false;

  cancel() {
    this.router.navigate(['/', 'accusation']);
  }

  back() {
    this.router.navigate(['/', 'accusation', 'detail']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณยืนยันการบันทึกข้อมูลใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
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
        content: `เลขที่รายการ : 640120000123
        วันที่ : 10 ตุลาคม 2656`,
        subContent: 'ผู้บันทึกข้อมูล : นางสาวปาเจรา ไก่คลุก',
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'accusation']);
      }
    });
  }
}

export const decisions = [
  {
    label: 'รับเรื่องพิจารณา และดำเนินการขั้นต่อไป',
    value: 1,
  },
  {
    label: 'ไม่รับเรื่องพิจารณาและจำหน่ายออก เนื่องจากอายุความเกิน 1 ปี',
    value: 2,
  },
  {
    label: 'ยุติเรื่องกรณีไม่มีใบอนุญาต',
    value: 3,
  },
  {
    label: 'บัตรสนเทห์',
    value: 4,
  },
  {
    label: 'หนังสือร้องเรียนขาดสาระสำคัญ',
    value: 5,
  },
  {
    label:
      'เหตุเกิดก่อนข้อบังคับคุรุสภาว่าด้วยมาตรฐานวิชาชีพและจรรยาบรรณวิชาชีพ พ.ศ.2548',
    value: 6,
  },
  {
    label: 'อื่นๆ (ระบุด้วยตนเอง)',
    value: 7,
  },
];
