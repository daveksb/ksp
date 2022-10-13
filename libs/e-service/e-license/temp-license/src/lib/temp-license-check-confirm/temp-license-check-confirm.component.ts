import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  saveData!: KspApprovePersistData;

  form = this.fb.group({
    approveResult: [],
    returnDate: [],
    rejectReason: [],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private eRequestService: ERequestService
  ) {}

  ngOnInit(): void {
    localForage.getItem('checkRequestData').then((res: any) => {
      this.saveData = res;
    });
    this.checkRequestId();
  }

  /*     const payload = {
      ...res,
      ...{
        checksubresult: JSON.stringify({
          ...res.checksubresult,
          ...{ approveResult: this.form.value },
        }),
      },
    };
 */

  save() {
    //console.log('payload = ', this.form.value);
    console.log('save data = ', this.saveData);
    const payload: KspApprovePayload = {
      id: this.saveData.requestData.id,
      process: null,
      status: null,
      detail: "{'field1':'data1','field2':'data2','field3':'data3'}",
      systemtype: '2', // school
      userid: null,
      paymentstatus: null,
    };

    /*     this.eRequestService.KspApproveRequest(payload).subscribe((res) => {
      console.log('check result = ', res);
    }); */
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
