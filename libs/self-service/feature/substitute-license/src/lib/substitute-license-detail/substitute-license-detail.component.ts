import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  UserInfoFormType,
  SelfServiceRequestSubType,
} from '@ksp/shared/constant';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { LicenseFormBaseComponent } from '@ksp/self-service/form';
import { FormBuilder } from '@angular/forms';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import { replaceEmptyWithNull, toLowercaseProp } from '@ksp/shared/utility';
import { SelfRequest } from '@ksp/shared/interface';
import * as _ from 'lodash';

@Component({
  selector: 'ksp-substitute-license-detail',
  templateUrl: './substitute-license-detail.component.html',
  styleUrls: ['./substitute-license-detail.component.scss'],
})
export class SubstituteLicenseDetailComponent
  extends LicenseFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;
  objectiveFiles = [
    '1.ใบอนุญาตประกอบวิชาชีพที่ชํารุด',
    '2.หลักฐานการรับแจงความของพนักงานสอบสวน หรือบันทึกถอยคํา กรณีใบอนุญาตสูญหาย',
  ];

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    replaceReasonInfo: [],
  });

  constructor(
    dialog: MatDialog,
    router: Router,
    fb: FormBuilder,
    generalInfoService: GeneralInfoService,
    addressService: AddressService,
    educationDetailService: EducationDetailService,
    myInfoService: MyInfoService,
    requestService: SelfRequestService
  ) {
    super(
      generalInfoService,
      addressService,
      educationDetailService,
      fb,
      requestService,
      router,
      myInfoService,
      dialog
    );
  }

  ngOnInit(): void {
    this.getListData();
    this.getMyInfo();
    // this.checkButtonsDisableStatus();
  }

  patchUserInfoForm(data: any): void {
    this.form.controls.userInfo.patchValue(data);
  }

  patchAddress1Form(data: any): void {
    this.form.controls.address1.patchValue(data);
  }

  patchAddress2Form(data: any): void {
    this.form.controls.address2.patchValue(data);
  }

  patchWorkPlaceForm(data: any): void {
    this.form.controls.workplace.patchValue(data);
  }

  patchAddress2FormWithAddress1(): void {
    this.form.controls.address2.patchValue(this.form.controls.address1.value);
  }

  createRequest(currentProcess: string) {
    const formData: any = this.form.getRawValue();
    if (formData?.address1?.addressType) formData.address1.addresstype = 1;
    if (formData?.address2?.addressType) formData.address2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    const userInfo = toLowercaseProp(rawUserInfo);

    // userInfo.ref1 = '1';
    // userInfo.ref2 = '04';
    // userInfo.ref3 = `${SelfServiceRequestSubType.ครู}`;
    // userInfo.systemtype = '1';
    // userInfo.requesttype = '1';
    // userInfo.subtype = '5';

    const self = new SelfRequest('1', '04', `${SelfServiceRequestSubType.ครู}`);
    const allowKey = Object.keys(self);

    // const { educationType, educationLevelForm } = formData.education;

    const initialPayload = {
      ...replaceEmptyWithNull(userInfo),
      ...{
        addressinfo: JSON.stringify([formData.address1, formData.address2]),
      },
      ...{
        schooladdrinfo: JSON.stringify(formData.workplace),
      },
      ...{
        replacereasoninfo: JSON.stringify(formData.replaceReasonInfo),
      },
      // ...{ eduinfo: JSON.stringify({ educationType, ...educationLevelForm }) },
      // ...{
      //   experienceinfo: JSON.stringify(formData.experience),
      // },
    };
    initialPayload.currentprocess = currentProcess;
    initialPayload.requeststatus = '1';
    console.log(initialPayload);
    const payload = _.pick({ ...self, ...initialPayload }, allowKey);
    console.log(payload);
    return payload;
  }

  next() {
    console.log(this.form.value);
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่?`,
        btnLabel: 'ยื่นแบบคำขอ',
        cancelBtnLabel: 'บันทึก',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        const payload = this.createRequest('0');
        this.requestService.createRequest(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.router.navigate(['/home']);
          }
        });
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest('1');
        this.requestService.createRequest(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.router.navigate(['/license', 'payment-channel']);
          }
        });
      }
    });
  }
}
