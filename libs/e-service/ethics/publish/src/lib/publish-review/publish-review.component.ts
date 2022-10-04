import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { EthicsService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import { EMPTY, switchMap } from 'rxjs';
import localForage from 'localforage';
@Component({
  selector: 'e-service-publish-review',
  templateUrl: './publish-review.component.html',
  styleUrls: ['./publish-review.component.scss'],
})
export class PublishReviewComponent implements OnInit {
  form = this.fb.group({
    publish: [],
  });
  ethicsId: any;
  today = thaiDate(new Date());
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: EthicsService,
    private route: ActivatedRoute
  ) {}

  cancel() {
    this.router.navigate(['/', 'publish', 'list']);
  }
  ngOnInit(): void {
    this.checkRequestId();
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
            const publishstatus = this.form.controls.publish.value;
            const payload = {
              id: this.ethicsId,
              publishstatus,
              publishdate: new Date().toISOString().split('T')[0],
            };
            return this.service.updateEthicsPublish(payload);
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
        this.router.navigate(['/', 'publish', 'list']);
      }
    });
  }
  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.ethicsId = Number(params.get('id'));

      if (this.ethicsId) {
        localForage.getItem('registerEthicsInfoValue').then((data: any) => {
          // this.form.controls.accusation.patchValue(data);
        });
      }
    });
  }
}
