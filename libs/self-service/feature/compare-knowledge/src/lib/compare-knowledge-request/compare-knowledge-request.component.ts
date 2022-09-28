import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  UserInfoFormType,
  SelfServiceRequestSubType,
  SelfServiceRequestType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
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
  selector: 'ksp-compare-knowledge-request',
  templateUrl: './compare-knowledge-request.component.html',
  styleUrls: ['./compare-knowledge-request.component.scss'],
})
export class CompareKnowledgeRequestComponent
  extends LicenseFormBaseComponent
  implements OnInit
{
  objectiveFiles = [
    { name: '1. สำเนาหลักฐานแสดงวุฒิการศึกษา', fileId: '', fileName: '' },
    {
      name: '2. รูปภาพถ่ายหน้าตรง ขนาด 1.5 x 2   นิ้ว',
      fileId: '',
      fileName: '',
    },
  ];
  userInfoType = UserInfoFormType.thai;

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    educationInfo: [],
    testResultCompareInfo: [],
  });

  constructor(
    dialog: MatDialog,
    router: Router,
    fb: FormBuilder,
    generalInfoService: GeneralInfoService,
    addressService: AddressService,
    educationDetailService: EducationDetailService,
    myInfoService: MyInfoService,
    requestService: SelfRequestService,
    route: ActivatedRoute
  ) {
    super(
      generalInfoService,
      addressService,
      educationDetailService,
      fb,
      requestService,
      router,
      myInfoService,
      route,
      dialog
    );
  }

  ngOnInit(): void {
    this.getListData();
    this.getMyInfo();
    // this.checkButtonsDisableStatus();
    this.initializeFiles();
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

  createRequest(currentProcess: number) {
    const formData: any = this.form.getRawValue();
    if (formData?.address1?.addressType) formData.address1.addresstype = 1;
    if (formData?.address2?.addressType) formData.address2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    const userInfo = toLowercaseProp(rawUserInfo);
    userInfo.requestfor = `${SelfServiceRequestForType.ชาวไทย}`;
    userInfo.uniquetimestamp = this.uniqueTimestamp;

    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอยื่นเทียบเคียงความรู้,
      `${SelfServiceRequestSubType.อื่นๆ}`,
      currentProcess
    );
    const allowKey = Object.keys(self);

    const attachfiles = this.objectiveFiles;

    const initialPayload = {
      ...replaceEmptyWithNull(userInfo),
      ...{
        addressinfo: JSON.stringify([formData.address1, formData.address2]),
      },
      ...{
        schooladdrinfo: JSON.stringify(formData.workplace),
      },
      ...{
        eduinfo: JSON.stringify(formData.educationInfo),
      },
      ...{
        testresultcompareinfo: JSON.stringify(formData.testResultCompareInfo),
      },
      ...{ fileinfo: JSON.stringify({ attachfiles }) },
    };
    console.log(initialPayload);
    const payload = _.pick({ ...self, ...initialPayload }, allowKey);
    console.log(payload);
    return payload;
  }

  submit(type: number) {
    console.log(this.form.value);
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(type);
        this.requestService.createRequest(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.onCompleted();
          }
        });
      }
    });
  }

  override onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'home']);
      }
    });
  }
}
