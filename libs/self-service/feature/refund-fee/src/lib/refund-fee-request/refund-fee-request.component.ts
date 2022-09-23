import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { SelfMyInfo, SelfRequest } from '@ksp/shared/interface';
import { MyInfoService, SelfRequestService } from '@ksp/shared/service';
import { parseJson, replaceEmptyWithNull, thaiDate } from '@ksp/shared/utility';
import * as _ from 'lodash';

@Component({
  selector: 'ksp-refund-fee-request',
  templateUrl: './refund-fee-request.component.html',
  styleUrls: ['./refund-fee-request.component.scss'],
})
export class RefundFeeRequestComponent implements OnInit {
  files = [{ name: '1.สำเนาวุฒิการศึกษา', fileId: '' }];
  headerGroup = ['วันที่ทำรายการ', 'เลขใบคำขอ'];
  userInfoType = UserInfoFormType.thai;
  today = thaiDate(new Date());
  userInfo!: SelfMyInfo;

  form = this.fb.group({
    userInfo: [],
    refundInfo: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private myInfoService: MyInfoService,
    private requestService: SelfRequestService
  ) {}

  ngOnInit(): void {
    this.myInfoService.getMyInfo().subscribe((res) => {
      //console.log('my info = ', res);
      this.userInfo = res;
      this.form.controls.userInfo.patchValue(<any>this.userInfo);
    });
  }

  createRequest() {
    //const payload = this.form.value;
    const self = new SelfRequest('1', '30', '1');
    const allowKey = Object.keys(self);
    const userInfo = this.form.controls.userInfo.value;

    const selectData: any = _.pick(userInfo, allowKey);
    const filledData = { ...self, ...selectData };
    const { id, requestdate, ...payload } = replaceEmptyWithNull(filledData);

    const feeRefundInfo = this.form.controls.refundInfo.value;
    payload.feerefundinfo = parseJson(feeRefundInfo);

    console.log('payload = ', payload);
    this.requestService.createRequest(payload).subscribe((res) => {
      //console.log('res = ', res);
    });
  }

  submit() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.createRequest();
        //this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }
}
