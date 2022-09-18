import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  UserInfoFormType,
  SelfServiceRequestSubType,
} from '@ksp/shared/constant';
import { LicenseFormBaseComponent } from '../license-form-base.component';
import { FormBuilder } from '@angular/forms';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  MyInfoService,
  LicenseRequestService as RequestLicenseService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { defaultRequestPayload } from '@ksp/shared/interface';
import { replaceEmptyWithNull, toLowercaseProp } from '@ksp/shared/utility';

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
    '1. สำเนาวุฒิทางการศึกษา',
    '2. หนังสือรับรองคุณวุฒิ	',
    '3. วุฒิบัตรอบรม',
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
    requestService: RequestLicenseService
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
    console.log('init');

    this.getListData();
    this.getMyInfo();
    this.checkButtonsDisableStatus();
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

  createRequest(forbidden: any, currentProcess: string) {
    const baseForm = this.fb.group(defaultRequestPayload);
    const formData: any = this.form.getRawValue();
    if (formData?.address1?.addressType) formData.address1.addresstype = 1;
    if (formData?.address2?.addressType) formData.address2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    const userInfo = toLowercaseProp(rawUserInfo);

    userInfo.ref1 = '1';
    userInfo.ref2 = '01';
    userInfo.ref3 = `${SelfServiceRequestSubType.ผู้บริหารการศึกษา}`;
    userInfo.systemtype = '1';
    userInfo.requesttype = '1';
    userInfo.subtype = '5';

    const { educationType, educationLevelForm } = formData.education;

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{
        addressinfo: JSON.stringify([formData.address1, formData.address2]),
      },
      ...{ schooladdrinfo: JSON.stringify(formData.workplace) },
      ...{ eduinfo: JSON.stringify({ educationType, ...educationLevelForm }) },
      ...{
        experienceinfo: JSON.stringify(formData.experience),
      },
      ...{ prohibitproperty: JSON.stringify(forbidden) },
    };
    payload.currentprocess = currentProcess;
    console.log(payload);
    baseForm.patchValue(payload);
    return baseForm.value;
  }

  checkButtonsDisableStatus() {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      this.disableNextButton = !this.form.valid;
    });
  }
}
