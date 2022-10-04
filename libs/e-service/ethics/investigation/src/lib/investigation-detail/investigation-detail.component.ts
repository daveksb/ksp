import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { FormInvestigationDetailComponent } from '@ksp/e-service/form';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { EthicsService } from '@ksp/shared/service';
import { jsonParse, replaceEmptyWithNull } from '@ksp/shared/utility';
import { EMPTY, switchMap } from 'rxjs';
@Component({
  selector: 'e-service-investigation-main',
  templateUrl: './investigation-detail.component.html',
  styleUrls: ['./investigation-detail.component.scss'],
})
export class InvestigationDetailComponent implements OnInit {
  form = this.fb.group({
    accusation: [],
    investigation: [],
  });
  ethicsId: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: EthicsService
  ) {}
  @ViewChild(AccusationRecordComponent)
  accusation!: AccusationRecordComponent;
  @ViewChild(FormInvestigationDetailComponent)
  investigation!: FormInvestigationDetailComponent;
  ngOnInit(): void {
    this.checkRequestId();
  }
  cancel() {
    //this.form.valueChanges.subscribe((res) => console.log(' res = ', res));
    this.router.navigate(['/', 'accusation']);
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
            const payload = this.form.value.investigation as any;
            payload.investigationresult = JSON.stringify(
              payload.investigationresult
            );
            payload.investigationsubcommittee = JSON.stringify(
              payload.investigationsubcommittee
            );
            payload.id = this.ethicsId;
            const pl = replaceEmptyWithNull(payload);
            return this.service.updateEthicsInvestigation(pl);
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
        this.router.navigate(['/', 'investigation']);
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
                const json = jsonParse(res?.accusationfile);
                element.fileId = json[index]?.fileid;
                element.fileName = json[index]?.filename;
              }
            });
            if (res?.accuserinfo) {
              const json = jsonParse(res?.accuserinfo);

              if (json.length) {
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
            this.form.controls.investigation.patchValue(res);
            this.form.controls.accusation.patchValue(res);
          });
      }
    });
  }
}
