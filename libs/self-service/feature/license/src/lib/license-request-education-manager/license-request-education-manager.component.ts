import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  parseJson,
  replaceEmptyWithNull,
  toLowercaseProp,
} from '@ksp/shared/utility';
import * as _ from 'lodash';

const EXPERIENCE_FILES = [
  { name: '1. สำเนาวุฒิทางการศึกษา', fileId: '', fileName: '' },
  { name: '2. หนังสือรับรองคุณวุฒิ	', fileId: '', fileName: '' },
  { name: '3. วุฒิบัตรอบรม', fileId: '', fileName: '' },
];

const EDU_FILES = [
  { name: '1. สำเนาวุฒิทางการศึกษา', fileId: '', fileName: '' },
  {
    name: '2. เอกสารผู้สำเร็จการศึกษา ( ระบบ KSP BUNDIT)		',
    fileId: '',
    fileName: '',
  },
  { name: '3. วุฒิบัตรอบรม', fileId: '', fileName: '' },
];

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

  experienceFiles: any[] = [];
  eduFiles: any[] = [];

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
    this.checkButtonsDisableStatus();
    this.checkRequestId();
  }

  override resetForm() {
    super.resetForm();
    this.eduFiles = structuredClone(EDU_FILES);
    this.experienceFiles = structuredClone(EXPERIENCE_FILES);
  }

  override initializeFiles() {
    super.initializeFiles();
    this.eduFiles = structuredClone(EDU_FILES);
    this.experienceFiles = structuredClone(EXPERIENCE_FILES);
  }

  override patchData(data: SelfRequest) {
    super.patchData(data);
    if (data.schooladdrinfo) {
      const { website, email } = parseJson(data.schooladdrinfo);
      this.form.patchValue({
        website,
        workEmail: email,
      });
    }

    if (data.eduinfo) {
      const eduInfo = parseJson(data.eduinfo);
      const { educationType, ...educationLevelForm } = eduInfo;
      this.form.controls.education.patchValue({
        educationType,
        educationLevelForm,
      } as any);
    }

    if (data.experienceinfo) {
      const experienceInfo = parseJson(data.experienceinfo);
      this.form.controls.experience.patchValue({ ...experienceInfo });
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { edufiles, experiencefiles } = fileInfo;
      this.eduFiles = edufiles;
      this.experienceFiles = experiencefiles;
    }
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

    const experiencefiles = this.experienceFiles;
    const edufiles = this.eduFiles;

    const payload = {
      ...self,
      ...replaceEmptyWithNull(selectData),
      ...(this.requestId && { id: `${this.requestId}` }),
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
      ...{ fileinfo: JSON.stringify({ edufiles, experiencefiles }) },
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
