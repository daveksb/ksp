import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { EthicsService } from '@ksp/shared/service';
import { EMPTY, switchMap, zip } from 'rxjs';
import localForage from 'localforage';
@Component({
  selector: 'e-service-inquiry-main',
  templateUrl: './inquiry-main.component.html',
  styleUrls: ['./inquiry-main.component.scss'],
})
export class InquiryMainComponent implements OnInit {
  form = this.fb.group({
    inquiry: [],
    inquiryresult: [],
    accusation: [],
    investigation: [],
  });
  ethicsId: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: EthicsService,
    private route: ActivatedRoute
  ) {}

  cancel() {
    this.router.navigate(['/', 'inquiry']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณยืนยันการบันทึกข้อมูลใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const payload = this.form.value.inquiry as any;
            if (payload) {
              payload.id = this.ethicsId;
              payload.inquiryresult = JSON.stringify(payload.inquiryresult);
            }
            const payload2 = this.form.value.inquiryresult as any;
            if (payload2) {
              payload2.id = this.ethicsId;
            }
            return zip(
              this.service.updateEthicsInquiry(payload),
              this.service.updateEthicsResult(payload2)
            );
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
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
        subContent: 'ผู้บันทึกข้อมูล : นางสาวปาเจรา ใกล้คุก',
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
  ngOnInit(): void {
    this.checkRequestId();
  }
  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.ethicsId = Number(params.get('id'));

      if (this.ethicsId) {
        this.service.getEthicsByID({ id: this.ethicsId }).subscribe((res) => {
          console.log(res);
        });
      }
    });
  }
}
