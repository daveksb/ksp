import { Component, OnInit } from '@angular/core';
import localForage from 'localforage';
import {
  KspApprovePayload,
  KspApprovePersistData,
} from '@ksp/shared/interface';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ERequestService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { RewardApproveResult } from '@ksp/e-service/e-license/approve-ksp-request';
import { getCookie } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  template: ``,
  standalone: true,
})
export abstract class ERewardConfirmFormBaseComponent implements OnInit {
  requestId!: number;
  saveData = new KspApprovePersistData();
  targetProcess!: number | null;
  targetStatus!: number | null;
  approveHistory: any[] = [];
  userId = `${getCookie('userId')}`;
  form = this.fb.group({
    approvement: [],
  });
  requestType!: string;

  constructor(
    protected fb: FormBuilder,
    protected route: ActivatedRoute,
    public dialog: MatDialog,
    protected eRequestService: ERequestService
  ) {}

  ngOnInit(): void {
    localForage.getItem('checkRequestData').then((res: any) => {
      console.log(res);
      this.saveData = res;
      this.requestType = this.saveData?.requestData?.requesttype || '';
      if (this.saveData.requestData.id)
        this.getApproveHistory(this.saveData.requestData.id);
      //console.log('save data = ', this.saveData);
    });
    this.checkRequestId();
  }

  checkApproveResult(input: RewardApproveResult) {
    //console.log('check aa = ');
    const req = this.saveData.requestData;
    console.log(req.process);
    console.log('input ', input);
    if (input.result === '1') {
      //ครบถ้วน และถูกต้อง
      if (input.shouldForward === false) {
        //ไม่ส่งตรวจสอบลำดับต่อไป
        if (req.process === '2') {
          this.targetProcess = Number(req.process) + 1;
        } else {
          this.targetProcess = Number(req.process);
        }
        this.targetStatus = 3;
      } else if (input.shouldForward === true) {
        //ส่งตรวจสอบลำดับต่อไป
        if (req.process === '2') {
          this.targetProcess = 4;
          this.targetStatus = 1;
        } else if (req.process === '3') {
          this.targetProcess = 4;
          this.targetStatus = 1;
        } else if (req.process === '4') {
          this.targetProcess = 6;
          this.targetStatus = 1;
        } else if (req.process === '5') {
          this.targetProcess = 6;
          this.targetStatus = 1;
        }
        console.log('target process = ', this.targetProcess);
        console.log('target status = ', this.targetStatus);
      }
    } else if (input.result === '2') {
      //ขอแก้ไข / เพิ่มเติม
      if (req.process === '2') {
        this.targetProcess = Number(req.process) + 1;
      } else {
        this.targetProcess = Number(req.process);
      }
      this.targetStatus = 2;
    } else if (input.result === '3') {
      //ขาดคุณสมบัติ
      if (req.process === '2') {
        this.targetProcess = Number(req.process) + 1;
      } else {
        this.targetProcess = Number(req.process);
      }
      this.targetStatus = 4;
    }
  }

  checkRequest() {
    const form: any = this.form.value.approvement;
    this.checkApproveResult(form);
    //console.log('save data = ', this.saveData);
    const payload: KspApprovePayload = {
      requestid: this.saveData.requestData.id,
      process: `${this.targetProcess}`,
      status: `${this.targetStatus}`,
      detail: JSON.stringify(this.saveData.checkDetail),
      systemtype: '4', // approve by e-service staff
      userid: this.userId,
      paymentstatus: null,
    };
    console.log('payload = ', payload);
    this.eRequestService.KspUpdateRequestProcess(payload).subscribe(() => {
      this.eRequestService
        .setUrgentRequest(this.saveData.requestData.id, form.isurgent)
        .subscribe(() => {
          this.navigateBack();
        });
    });
  }

  getApproveHistory(requestid: string) {
    this.eRequestService.getApproveHistory(requestid).subscribe((res) => {
      this.approveHistory = res;
    });
  }

  mapCheckResult(result: string) {
    if (result === '1') return 'ครบถ้วน และถูกต้อง';
    if (result === '2') return 'ขอแก้ไข / เพิ่มเติม';
    if (result === '3') return 'ขาดคุณสมบัติ';
    else return '';
  }

  checkRequestId() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      this.requestId = Number(params.get('id'));
    });
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
        this.checkRequest();
        /*         if (this.saveData.requestData.process === '5') {
          this.considerRequest();
        } else {
          this.checkRequest();
        } */
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
        this.navigateBack();
      }
    });
  }

  abstract navigateBack(): void;
  abstract prevPage(): void;
}
