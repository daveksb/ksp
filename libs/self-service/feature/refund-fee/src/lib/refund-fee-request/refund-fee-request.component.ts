import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  UserInfoFormType,
  SelfServiceRequestType,
  SelfServiceRequestSubType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { SelfMyInfo, SelfRequest } from '@ksp/shared/interface';
import {
  MyInfoService,
  SelfRequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { getCookie, replaceEmptyWithNull, thaiDate } from '@ksp/shared/utility';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import uniqueString from 'unique-string';

@Component({
  selector: 'ksp-refund-fee-request',
  templateUrl: './refund-fee-request.component.html',
  styleUrls: ['./refund-fee-request.component.scss'],
})
export class RefundFeeRequestComponent implements OnInit {
  files = [{ name: '1.สำเนาวุฒิการศึกษา', fileId: '', fileName: '' }];
  headerGroup = ['วันที่ทำรายการ', 'เลขใบคำขอ'];
  userInfoType = UserInfoFormType.thai;
  today = thaiDate(new Date());
  userInfo!: SelfMyInfo;
  prefixList$!: Observable<any>;
  uniqueTimestamp!: string;

  form = this.fb.group({
    userInfo: [],
    refundInfo: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private myInfoService: MyInfoService,
    private requestService: SelfRequestService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.myInfoService.getMyInfo().subscribe((res) => {
      //console.log('my info = ', res);
      this.userInfo = {
        ...res,
        birthdate: res.birthdate?.split('T')[0] || null,
        contactphone: res.phone,
      };
      this.form.controls.userInfo.patchValue(<any>this.userInfo);
    });
    this.initializeFile();
  }

  initializeFile() {
    this.uniqueTimestamp = uniqueString();
  }

  createRequest() {
    //const payload = this.form.value;
    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอคืนเงินค่าธรรมเนียม,
      `${SelfServiceRequestSubType.อื่นๆ}`
    );
    const allowKey = Object.keys(self);
    const userInfo = this.form.controls.userInfo.value as any;
    userInfo.requestfor = `${SelfServiceRequestForType.ชาวไทย}`;
    userInfo.uniquetimestamp = this.uniqueTimestamp;
    userInfo.staffid = getCookie('userId');

    const attachfiles = this.mapFileInfo(this.files);

    const selectData: any = _.pick(userInfo, allowKey);
    const filledData = {
      ...self,
      ...selectData,
      ...{ fileinfo: JSON.stringify({ attachfiles }) },
    };
    const { id, requestdate, ...payload } = replaceEmptyWithNull(filledData);

    const feeRefundInfo = this.form.controls.refundInfo.value;
    //console.log('fee refund info = ', feeRefundInfo);
    payload.feerefundinfo = JSON.stringify(feeRefundInfo);
    payload.birthdate = payload.birthdate.split('T')[0];

    console.log('payload = ', payload);
    return payload;
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
        const payload = this.createRequest();
        this.requestService.createRequest(payload).subscribe((res) => {
          //console.log('res = ', res);
          if (res?.returncode === '00') {
            this.onCompleted();
          }
        });
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

  mapFileInfo(fileList: any[]) {
    return fileList.map((file: any) => {
      const object = {
        fileid: file.fileId || null,
        filename: file.fileName || null,
        name: file.name || null,
      };
      return object;
    });
  }
}
