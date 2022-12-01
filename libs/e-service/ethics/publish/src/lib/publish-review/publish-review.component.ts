import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { InquiryDetailComponent } from '@ksp/e-service/ethics/inquiry';
import { FormInvestigationDetailComponent } from '@ksp/e-service/ethics/form';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { EthicsService } from '@ksp/shared/service';
import { jsonParse, thaiDate } from '@ksp/shared/utility';
import { EMPTY, switchMap } from 'rxjs';
@Component({
  selector: 'e-service-publish-review',
  templateUrl: './publish-review.component.html',
  styleUrls: ['./publish-review.component.scss'],
})
export class PublishReviewComponent implements OnInit {
  form = this.fb.group({
    publishstatus: [],
    inquiry: [],
    inquiryresult: [],
    accusation: [],
    investigation: [],
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
  @ViewChild(AccusationRecordComponent)
  accusation!: AccusationRecordComponent;
  @ViewChild(FormInvestigationDetailComponent)
  investigation!: FormInvestigationDetailComponent;
  @ViewChild(InquiryDetailComponent)
  inquiry!: InquiryDetailComponent;
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
            const publishstatus = this.form.controls.publishstatus.value;
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
        this.service
          .getEthicsByID({ id: this.ethicsId })
          .subscribe((res: any) => {
            this.accusation.accusationFiles.forEach((element, index) => {
              if (res.accusationfile) {
                const json: any = jsonParse(res?.accusationfile);
                element.fileid = json[index]?.fileid;
                element.filename = json[index]?.filename;
              }
            });
            if (res?.accuserinfo) {
              const json = jsonParse(res?.accuserinfo);

              if (json && json.length) {
                for (let i = 0; i < json.length; i++) {
                  this.accusation.addRow();
                }
              }
              res.accuserinfo = json;
            }
            if (res?.investigationresult) {
              const json = jsonParse(res?.investigationresult);
              res.investigationresult = json;
            }
            if (res?.investigationsubcommittee) {
              const json = jsonParse(res?.investigationsubcommittee);
              if (json?.length) {
                for (let i = 0; i < json.length; i++) {
                  this.investigation.addRow();
                }
              }
              res.investigationsubcommittee = json;
            }
            if (res?.inquiryresult) {
              const json = jsonParse(res?.inquiryresult);
              res.inquiryresult = json;
            }
            if (res.inquirysubcommittee) {
              const json = jsonParse(res?.inquirysubcommittee);
              if (json?.length) {
                for (let i = 0; i < json.length; i++) {
                  this.inquiry.addRow();
                }
              }
              res.inquirysubcommittee = json;
            }
            this.form.controls.accusation.patchValue(res);
            this.form.controls.inquiryresult.patchValue(res);
            this.form.controls.investigation.patchValue(res);
            this.form.controls.inquiry.patchValue(res);
            this.form.controls.publishstatus.patchValue(res.publishstatus);
          });
      }
    });
  }
}
