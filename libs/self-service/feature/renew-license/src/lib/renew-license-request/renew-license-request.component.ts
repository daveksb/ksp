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
import { FileGroup, SelfMyInfo, SelfRequest } from '@ksp/shared/interface';
import {
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
  toLowercaseProp,
} from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const WORKING_INFO_FILES: FileGroup[] = [
  {
    name: '1.สำเนาผลการปฏิบัติงานตามมาตรฐานการปฏิบัติงาน (3 กิจกรรม)',
    files: [],
  },
];

const WORKING_INFO_FILES_2: FileGroup[] = [
  {
    name: '1.สำเนาผลการปฏิบัติงานตามมาตรฐานการปฏิบัติงาน',
    files: [],
  },
];

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
    standardWorking: [],
    workPhone: [],
    fax: [],
    website: [],
    workEmail: [],
  });

  disableNextButton = false;
  myInfo$!: Observable<SelfMyInfo>;
  today = thaiDate(new Date());

  workingInfoFiles: any[] = [];
  workingInfoFiles2: any[] = [];

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
    this.myInfo$ = this.myInfoService.getMyInfo();
    this.getListData();
    this.checkButtonsDisableStatus();
    this.checkRequestId();
  }

  get userInfoForm() {
    return this.form.controls.userInfo;
  }

  override initializeFiles() {
    super.initializeFiles();
    this.workingInfoFiles = structuredClone(WORKING_INFO_FILES);
    this.workingInfoFiles2 = structuredClone(WORKING_INFO_FILES_2);
    this.uniqueTimestamp = uuidv4();
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

    if (data.performanceinfo) {
      const performanceInfo = parseJson(data.performanceinfo);
      const { educationType, ...educationLevelForm } = performanceInfo;
      this.form.controls.standardWorking.patchValue({
        educationType,
        educationLevelForm,
      } as any);
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { performancefiles, performancefiles2 } = fileInfo;
      this.workingInfoFiles = performancefiles;
      this.workingInfoFiles2 = performancefiles2;
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
    console.log(this.form.controls.address1.value);
    this.form.controls.address2.patchValue(this.form.controls.address1.value);
    console.log(this.form.controls.address2.value);
  }

  createRequest(forbidden: any, currentProcess: number) {
    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอต่ออายุใบอนุญาตประกอบวิชาชีพ,
      `${SelfServiceRequestSubType.ครู}`,
      currentProcess
    );
    const allowKey = Object.keys(self);
    const formData: any = this.form.getRawValue();
    if (formData?.address1?.addressType) formData.address1.addresstype = 1;
    if (formData?.address2?.addressType) formData.address2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    const userInfo = toLowercaseProp(rawUserInfo);
    self.isforeign = `${SelfServiceRequestForType.ชาวไทย}`;
    self.uniqueno = this.uniqueTimestamp;
    self.userid = getCookie('userId');
    const selectData = _.pick(userInfo, allowKey);

    const { educationType, educationLevelForm } = formData.standardWorking || {
      educationType: null,
      educationLevelForm: null,
    };

    const performancefiles = this.workingInfoFiles;
    const performancefiles2 = this.workingInfoFiles2;

    const payload = {
      ...self,
      ...replaceEmptyWithNull(selectData),
      ...(this.requestId && { id: `${this.requestId}` }),
      ...(this.imageId && { imagefileid: `${this.imageId}` }),
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
      ...{ prohibitproperty: JSON.stringify(forbidden) },
      ...{ fileinfo: JSON.stringify({ performancefiles, performancefiles2 }) },
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
