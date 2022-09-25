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
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SchoolRequest, SelfMyInfo } from '@ksp/shared/interface';
import {
  replaceEmptyWithNull,
  thaiDate,
  toLowercaseProp,
} from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ksp-renew-license-request',
  templateUrl: './renew-license-request.component.html',
  styleUrls: ['./renew-license-request.component.scss'],
})
export class RenewLicenseRequestComponent
  extends LicenseFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    workPhone: [],
    standardWorking: [],
    fax: [],
    website: [],
    workEmail: [],
  });

  disableNextButton = false;
  myInfo$!: Observable<SelfMyInfo>;
  today = thaiDate(new Date());

  constructor(
    router: Router,
    dialog: MatDialog,
    fb: FormBuilder,
    addressService: AddressService,
    generalInfoService: GeneralInfoService,
    educationDetailService: EducationDetailService,
    requestService: SelfRequestService,
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
    this.myInfo$ = this.myInfoService.getMyInfo();
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
    console.log(this.form.controls.address1.value);
    this.form.controls.address2.patchValue(this.form.controls.address1.value);
    console.log(this.form.controls.address2.value);
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
    userInfo.ref3 = `${SelfServiceRequestSubType.ครู}`;
    userInfo.systemtype = '1';
    userInfo.requesttype = '1';
    userInfo.subtype = '5';

    const { educationType, educationLevelForm } = formData.standardWorking;

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
        performanceinfo: JSON.stringify({
          educationType,
          ...educationLevelForm,
        }),
      },
      // ...{
      //   experienceinfo: JSON.stringify(formData.experience),
      // },
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
