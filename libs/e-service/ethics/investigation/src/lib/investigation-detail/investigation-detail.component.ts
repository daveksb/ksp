import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { EthicsService } from '@ksp/shared/service';
import localForage from 'localforage';
import { EMPTY, switchMap } from 'rxjs';
@Component({
  selector: 'e-service-investigation-main',
  templateUrl: './investigation-detail.component.html',
  styleUrls: ['./investigation-detail.component.scss'],
})
export class InvestigationDetailComponent implements OnInit {
  form = this.fb.group({
    accusation: [],
    invsetigation: [],
  });
  ethicsId: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: EthicsService
  ) {}
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
            const payload = this.form.value.invsetigation as any;
            payload.investigationresult = JSON.stringify(
              payload.investigationresult
            );
            payload.id = this.ethicsId;
            return this.service.updateEthicsInvestigation(
              this.form.value.invsetigation
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
        this.router.navigate(['/', 'investigation']);
      }
    });
  }
  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.ethicsId = Number(params.get('id'));
      if (this.ethicsId) {
        localForage
          .getItem('registerEthicsInfoValue')
          .then((data: any) => {
            console.log(data);
            // this.formComponents.addRow();
            this.form.controls.accusation.patchValue(data);
          })
          .catch((res) => console.log(res));
      }
    });
  }
}
