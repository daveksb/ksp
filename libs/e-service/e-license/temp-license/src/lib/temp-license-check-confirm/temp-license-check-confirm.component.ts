import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { approveResult } from '@ksp/e-service/e-license/approve-ksp-request';
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
  targetProcess!: number | null;
  targetStatus!: number | null;

  form = this.fb.group({
    approvement: [],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private eRequestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      console.log(res.approvement);
    });

    localForage.getItem('checkRequestData').then((res: any) => {
      this.saveData = res;
      if (this.saveData.requestData.id)
        this.getApproveHistory(this.saveData.requestData.id);
      //console.log('save data = ', this.saveData);
    });
    this.checkRequestId();
  }

  checkApproveResult(input: approveResult) {
    if (input.result === '1') {
      //ครบถ้วน และถูกต้อง
      if (input.shouldForward === '1') {
        //ไม่ส่งตรวจสอบลำดับต่อไป
        this.targetProcess = Number(this.saveData.requestData.process);
        this.targetStatus = 3;
      } else if (input.shouldForward === '2') {
        //ส่งตรวจสอบลำดับต่อไป
        this.targetProcess = Number(this.saveData.requestData.process) + 1;
        this.targetStatus = 1;
      } else if (input.shouldForward === '4') {
        //ส่งเรื่องพิจารณา
        this.targetProcess = 4;
        this.targetStatus = 1;
      }
    } else if (input.result === '2') {
      //ขอแก้ไข / เพิ่มเติม
      this.targetProcess = Number(this.saveData.requestData.process) + 1;
      this.targetStatus = 2;
    } else if (input.result === '3') {
      this.targetProcess = Number(this.saveData.requestData.process);
      if (input.shouldForward === '3') {
        //ไม่ผ่านการตรวจสอบ เนื่องจากไม่ครบถ้วน / ไม่ถูกต้อง
        this.targetStatus = 3;
      } else if (input.shouldForward === '5') {
        //ยกเลิก
        this.targetStatus = 5;
      }
    }
  }

  checkRequest() {
    this.checkApproveResult(<any>this.form.value.approvement);
    //console.log('save data = ', this.saveData);
    //console.log('form = ', this.selectResult);
    const payload: KspApprovePayload = {
      requestid: this.saveData.requestData.id,
      process: `${this.targetProcess}`,
      status: `${this.targetStatus}`,
      detail: JSON.stringify(this.saveData.checkDetail),
      systemtype: '2', // school
      userid: null,
      paymentstatus: null,
    };

    console.log('payload = ', payload);

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      console.log('result = ', res.app);
      this.navigateBack();
    });
  }

  considerRequest() {
    console.log('consider request  = ');

    const form: any = this.form.value.approvement;
    const payload: KspApprovePayload = {
      requestid: this.saveData.requestData.id,
      process: '5',
      status: `${form.result}`,
      detail: JSON.stringify(this.saveData.checkDetail),
      systemtype: '2',
      userid: null,
      paymentstatus: null,
    };

    console.log('payload = ', payload);

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      //console.log('result = ', res.app);
      this.navigateBack();
    });
  }

  getApproveHistory(requestid: string) {
    this.eRequestService.getApproveHistory(requestid).subscribe((res) => {
      console.log('list = ', res);
    });
  }

  checkRequestId() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      this.requestId = Number(params.get('id'));
    });
  }

  navigateBack() {
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
        if (this.saveData.requestData.process === '5') {
          this.considerRequest();
        } else {
          this.checkRequest();
        }
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
