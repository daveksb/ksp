import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SelfRequest } from '@ksp/shared/interface';
import {
  getCookie,
  replaceEmptyWithNull,
  toLowercaseProp,
} from '@ksp/shared/utility';
import * as _ from 'lodash';

@UntilDestroy()
@Component({
  selector: 'self-service-license-request-education-manager',
  templateUrl: './license-request-education-manager.component.html',
  styleUrls: ['./license-request-education-manager.component.scss'],
})
export class LicenseRequestEducationManagerComponent
  extends LicenseFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;

  experienceFiles = [
    { name: '1. สำเนาวุฒิทางการศึกษา', fileId: '', fileName: '' },
    { name: '2. หนังสือรับรองคุณวุฒิ	', fileId: '', fileName: '' },
    { name: '3. วุฒิบัตรอบรม', fileId: '', fileName: '' },
  ];

  educationeFiles = [
    '1. สำเนาวุฒิทางการศึกษา',
    '2. เอกสารผู้สำเร็จการศึกษา ( ระบบ KSP BUNDIT)		',
    '3. วุฒิบัตรอบรม',
  ];

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    education: [],
    experience: [],
    website: [],
    workEmail: [],
  });

  disableNextButton = false;

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
    this.checkButtonsDisableStatus();
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

  createRequest(forbidden: any, currentProcess: number) {
    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ,
      `${SelfServiceRequestSubType.ผู้บริหารการศึกษา}`,
      currentProcess
    );
    const allowKey = Object.keys(self);
    const formData: any = this.form.getRawValue();
    if (formData?.address1?.addressType) formData.address1.addresstype = 1;
    if (formData?.address2?.addressType) formData.address2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    const userInfo = toLowercaseProp(rawUserInfo);
    userInfo.requestfor = `${SelfServiceRequestForType.ชาวไทย}`;
    userInfo.uniquetimestamp = this.uniqueTimestamp;
    userInfo.staffid = getCookie('userId');

    const selectData = _.pick(userInfo, allowKey);

    const { educationType, educationLevelForm } = formData.education || {
      educationType: null,
      educationLevelForm: null,
    };

    const experiencefiles = this.mapFileInfo(this.experienceFiles);

    const payload = {
      ...self,
      ...replaceEmptyWithNull(selectData),
      ...{
        addressinfo: JSON.stringify([formData.address1, formData.address2]),
      },
      ...{
        schooladdrinfo: JSON.stringify({
          ...formData.workplace,
          website: formData.website,
          email: formData.workEmail,
        }),
      },
      ...{ eduinfo: JSON.stringify({ educationType, ...educationLevelForm }) },
      ...{
        experienceinfo: JSON.stringify(formData.experience),
      },
      ...{ prohibitproperty: JSON.stringify(forbidden) },
      ...{ fileinfo: JSON.stringify({ experiencefiles }) },
    };
    console.log(payload);
    return payload;
  }

  checkButtonsDisableStatus() {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //this.disableNextButton = !this.form.valid;
      this.disableNextButton = false;
    });
  }
}
