import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { KspApprovePayload } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import localForage from 'localforage';
import { KspApprovePersistData } from '../e-temp-license-detail/e-temp-license-detail.component';

@UntilDestroy()
@Component({
  selector: 'e-service-temp-license-check-confirm',
  templateUrl: './temp-license-check-confirm.component.html',
  styleUrls: ['./temp-license-check-confirm.component.scss'],
})
export class TempLicenseCheckConfirmComponent implements OnInit {
  requestId!: number;
  saveData = new KspApprovePersistData();
  selectResult: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private eRequestService: ERequestService
  ) {}

  ngOnInit(): void {
    localForage.getItem('checkRequestData').then((res: any) => {
      this.saveData = res;
      console.log('save data = ', this.saveData);
    });
    this.checkRequestId();
  }

  save() {
    //console.log('save data = ', this.saveData);
    console.log('form = ', this.selectResult);
    console.log('save data = ', this.saveData);
    const payload: KspApprovePayload = {
      requestid: this.saveData.requestData.id,
      process: `${Number(this.saveData.requestData.process) + 1}`,
      status: `${this.selectResult}`,
      detail: JSON.stringify(this.saveData.checkDetail),
      systemtype: '2', // school
      userid: null,
      paymentstatus: null,
    };

    this.eRequestService.KspApproveRequest(payload).subscribe((res) => {
      console.log('result = ', res);
      this.cancel();
    });
  }

  checkRequestId() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      this.requestId = Number(params.get('id'));
    });
  }

  cancel() {
    this.router.navigate(['/temp-license', 'list']);
  }

  prevPage() {
    this.router.navigate(['/temp-license', 'detail', this.requestId]);
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.save();
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }
}
