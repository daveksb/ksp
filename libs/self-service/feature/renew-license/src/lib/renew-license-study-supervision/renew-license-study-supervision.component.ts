import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  UserInfoFormType,
  SelfServiceRequestSubType,
} from '@ksp/shared/constant';
import { LicenseFormBaseComponent } from '@ksp/self-service/form';
import { FormBuilder } from '@angular/forms';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  LicenseRequestService,
  MyInfoService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SchoolRequest } from '@ksp/shared/interface';
import { replaceEmptyWithNull, toLowercaseProp } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'ksp-renew-license-study-supervision',
  templateUrl: './renew-license-study-supervision.component.html',
  styleUrls: ['./renew-license-study-supervision.component.scss'],
})
export class RenewLicenseStudySupervisionComponent
  extends LicenseFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;
  headerGroup = [
    'วันที่ทำรายการ',
    'เลขใบคำขอ',
    'เลขที่ใบอนุญาต',
    'เลขที่ประจำตัวคุรุสภา',
    'เลขประจำตัวประชาชน',
    'วันที่ออกใบอนุญาต',
    'วันที่หมดอายุใบอนุญาต',
  ];

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    workPhone: [],
    educationForm: [],
    standardWorking: [],
    fax: [],
    website: [],
    workEmail: [],
  });

  disableNextButton = false;

  constructor(
    router: Router,
    dialog: MatDialog,
    fb: FormBuilder,
    addressService: AddressService,
    generalInfoService: GeneralInfoService,
    educationDetailService: EducationDetailService,
    requestService: LicenseRequestService,
    myInfoService: MyInfoService
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
    const baseForm = this.fb.group(SchoolRequest);
    const formData: any = this.form.getRawValue();
    if (formData?.address1?.addressType) formData.address1.addresstype = 1;
    if (formData?.address2?.addressType) formData.address2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    const userInfo = toLowercaseProp(rawUserInfo);

    userInfo.ref1 = '1';
    userInfo.ref2 = '02';
    userInfo.ref3 = `${SelfServiceRequestSubType.ศึกษานิเทศก์}`;
    userInfo.systemtype = '1';
    userInfo.requesttype = '1';
    userInfo.subtype = '5';

    const { educationType, educationLevelForm } = formData.educationForm;
    const {
      educationType: standardType,
      educationLevelForm: standardLevelForm,
    } = formData.standardWorking;

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{
        addressinfo: JSON.stringify([formData.address1, formData.address2]),
      },
      ...{
        schooladdrinfo: JSON.stringify({
          ...formData.workplace,
          website: formData.website,
          email: formData.workEmail,
          phone: formData.workPhone,
          fax: formData.fax,
        }),
      },
      ...{
        eduinfo: JSON.stringify({
          educationType,
          ...educationLevelForm,
        }),
      },
      ...{
        performanceinfo: JSON.stringify({
          standardType,
          ...standardLevelForm,
        }),
      },
      ...{ prohibitproperty: JSON.stringify(forbidden) },
    };
    payload.currentprocess = currentProcess;
    payload.requeststatus = '1';
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
