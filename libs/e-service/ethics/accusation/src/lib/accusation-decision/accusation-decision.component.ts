import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';

@Component({
  selector: 'e-service-accusation-decision',
  templateUrl: './accusation-decision.component.html',
  styleUrls: ['./accusation-decision.component.scss'],
})
export class AccusationDecisionComponent {
  decisions = decisions;

  form = this.fb.group({
    decisions1: [false],
    decisions2: [false],
    decisions3: [false],
    decisions4: [false],
    decisions5: [false],
    decisions6: [false],
    decisions7: [false],
    otherDetail: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  @Input() hideAllButtons = false;

  cancel() {
    //this.form.valueChanges.subscribe((res) => console.log('res = ', res));
    this.router.navigate(['/', 'accusation']);
  }

  back() {
    this.router.navigate(['/', 'accusation', 'detail']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณยืนยันการบันทึกข้อมูล
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
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `เลขที่รายการ : 640120000123
        วันที่ : 10 ตุลาคม 2656`,
        subContent: 'ผู้บันทึกข้อมูล : นางสาวปาวีณา ไก่คลุก',
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
    name: 'decisions1',
    value: false,
  },
  {
    label: 'ไม่รับเรื่องพิจารณาและจำหน่ายออก เนื่องจากอายุความเกิน 1 ปี',
    name: 'decisions2',
    value: false,
  },
  {
    label: 'ยุติเรื่องกรณีไม่มีใบอนุญาต',
    name: 'decisions3',
    value: false,
  },
  {
    label: 'บัตรสนเทห์',
    name: 'decisions4',
    value: false,
  },
  {
    label: 'หนังสือร้องเรียนขาดสาระสำคัญ',
    name: 'decisions5',
    value: false,
  },
  {
    label:
      'เหตุเกิดก่อนข้อบังคับคุรุสภาว่าด้วยมาตรฐานวิชาชีพและจรรยาบรรณวิชาชีพ พ.ศ.2548',
    name: 'decisions6',
    value: false,
  },
  {
    label: 'อื่นๆ (ระบุด้วยตนเอง)',
    name: 'decisions7',
    value: false,
  },
];
