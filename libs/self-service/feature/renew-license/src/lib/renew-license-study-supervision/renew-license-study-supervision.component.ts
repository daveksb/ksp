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

const WORKING_INFO_FILES = [
  {
    name: '1.รางวัลอื่นและประกาศเกียรติคุณ',
    fileId: '',
    fileName: '',
  },
];

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

  workingInfoFiles: any[] = [];
  licenseFiles: any[] = [];

  constructor(
    router: Router,
    dialog: MatDialog,
    fb: FormBuilder,
    addressService: AddressService,
    generalInfoService: GeneralInfoService,
    educationDetailService: EducationDetailService,
    requestService: SelfRequestService,
    myInfoService: MyInfoService,
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

  override initializeFiles() {
    super.initializeFiles();
    this.workingInfoFiles = structuredClone(WORKING_INFO_FILES);
    this.licenseFiles = structuredClone(WORKING_INFO_FILES);
  }

  override patchData(data: SelfRequest) {
    super.patchData(data);
    if (data.schooladdrinfo) {
      const { website, email, fax, phone } = parseJson(data.schooladdrinfo);
      this.form.patchValue({
        website,
        workEmail: email,
        fax,
        workPhone: phone,
      });
    }

    if (data.eduinfo) {
      const eduInfo = parseJson(data.eduinfo);
      const { educationType, ...educationLevelForm } = eduInfo;
      this.form.controls.educationForm.patchValue({
        educationType,
        educationLevelForm,
      } as any);
    }

    if (data.performanceinfo) {
      const performanceInfo = parseJson(data.performanceinfo);
      const { standardType, ...standardLevelForm } = performanceInfo;
      this.form.controls.standardWorking.patchValue({
        educationType: standardType,
        educationLevelForm: standardLevelForm,
      } as any);
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { performancefiles, licensefiles } = fileInfo;
      this.workingInfoFiles = performancefiles;
      this.licenseFiles = licensefiles;
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
      SelfServiceRequestType.ขอต่ออายุใบอนุญาตประกอบวิชาชีพ,
      `${SelfServiceRequestSubType.ศึกษานิเทศก์}`,
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

    const { educationType, educationLevelForm } = formData.educationForm || {
      educationType: null,
      educationLevelForm: null,
    };
    const {
      educationType: standardType,
      educationLevelForm: standardLevelForm,
    } = formData.standardWorking || {
      educationType: null,
      educationLevelForm: null,
    };

    const performancefiles = this.workingInfoFiles;
    const licensefiles = this.licenseFiles;

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
      ...{ fileinfo: JSON.stringify({ performancefiles, licensefiles }) },
    };
    console.log(payload);
    return payload;
  }

  checkButtonsDisableStatus() {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      this.disableNextButton = false; //!this.form.valid;
    });
  }

  onSave(currentProcess: number) {
    this.currentProcess = currentProcess;
    this.save();
  }

  override onCompleted(forbidden: any) {
    const payload = this.createRequest(forbidden, this.currentProcess);
    const request = this.requestId
      ? this.requestService.updateRequest.bind(this.requestService)
      : this.requestService.createRequest.bind(this.requestService);
    request(payload).subscribe((res) => {
      console.log('request result = ', res);
      if (res.returncode === '00') {
        if (this.currentProcess === 2) {
          this.router.navigate(['/license', 'payment-channel']);
        } else {
          this.router.navigate(['/home']);
        }
      }
    });
  }
}
