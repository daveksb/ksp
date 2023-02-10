import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { LicenseRequestService } from './license-request.service';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  MyInfoService,
  SelfRequestService,
  LoaderService,
} from '@ksp/shared/service';
import { Country, FileGroup, SelfRequest } from '@ksp/shared/interface';
import {
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  toLowercaseProp,
} from '@ksp/shared/utility';
import {
  UserInfoFormType,
  SelfServiceRequestType,
  SelfServiceRequestSubType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
import { LicenseFormBaseComponent } from '@ksp/self-service/form';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  templateUrl: './license-request.component.html',
  styleUrls: ['./license-request.component.scss'],
})
export class LicenseRequestComponent
  extends LicenseFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  countries$!: Observable<Country[]>;
  licenses$!: Observable<any>;
  eduFiles: FileGroup[] = [];
  experienceFiles: FileGroup[] = [];
  performanceFiles: FileGroup[] = [];
  selectedTabIndex = 0;
  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    education: [],
    experience: [],
  });

  constructor(
    router: Router,
    dialog: MatDialog,
    fb: FormBuilder,
    public service: LicenseRequestService,
    addressService: AddressService,
    generalInfoService: GeneralInfoService,
    educationDetailService: EducationDetailService,
    requestService: SelfRequestService,
    myInfoService: MyInfoService,
    route: ActivatedRoute,
    private loaderService: LoaderService
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
    this.checkRequestId();
    /*     this.form.valueChanges.subscribe((res) => {
      //console.log('1 = ', this.userInfoForm.valid);
    }); */
  }

  get userInfoForm() {
    return this.form.controls.userInfo;
  }

  override resetForm() {
    super.resetForm();
    this.eduFiles = structuredClone(this.service.educationFiles);
    this.experienceFiles = structuredClone(this.service.experienceFiles);
    this.performanceFiles = structuredClone(this.service.performanceFiles);
  }

  override initializeFiles() {
    this.uniqueTimestamp = uuidv4();
    this.eduFiles = structuredClone(this.service.educationFiles);
    this.experienceFiles = structuredClone(this.service.experienceFiles);
    this.performanceFiles = structuredClone(this.service.performanceFiles);
  }

  override getListData() {
    super.getListData();
    this.countries$ = this.addressService.getCountry();
    this.licenses$ = this.educationDetailService.getLicenseType();
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

  override patchData(data: SelfRequest) {
    super.patchData(data);
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
      this.form.controls.experience.patchValue({
        ...experienceInfo,
      } as any);
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      //console.log(fileInfo);
      const { edufiles, experiencefiles, performancefiles } = fileInfo;
      this.eduFiles = edufiles;
      this.experienceFiles = experiencefiles;
      this.performanceFiles = performancefiles;
    }
  }

  getAmphurChanged(addrType: number, province: any) {
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      } else if (addrType === 3) {
        this.amphurs3$ = this.addressService.getAmphurs(province);
      }
    }
  }

  getTumbon(addrType: number, amphur: any) {
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 3) {
        this.tumbols3$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  createRequest(forbidden: any, currentProcess: number) {
    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอขึ้นทะเบียนหนังสืออนุญาตประกอบวิชาชีพ,
      `${SelfServiceRequestSubType.ครู}`,
      currentProcess
    );
    const allowKey = Object.keys(self);
    const formData: any = this.form.getRawValue();
    if (formData?.address1?.addressType) formData.address1.addresstype = 1;
    if (formData?.address2?.addressType) formData.address2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    console.log('rawUserInfo ', rawUserInfo);
    //console.log('requestId ', this.requestId);
    const userInfo = toLowercaseProp(rawUserInfo);
    self.isforeign = `${SelfServiceRequestForType.ชาวไทย}`;
    self.uniqueno = this.uniqueTimestamp;
    self.userid = getCookie('userId');
    //console.log('user info = ', userInfo);

    const selectData = _.pick(userInfo, allowKey);

    const { educationType, educationLevelForm } = formData?.education || {
      educationType: null,
      educationLevelForm: null,
    };

    const edufiles = this.eduFiles;
    const experiencefiles = this.experienceFiles;
    const performancefiles = this.performanceFiles;

    const payload: SelfRequest = {
      ...self,
      ...replaceEmptyWithNull(selectData),
      ...(this.requestId && { id: `${this.requestId}` }),
      ...(this.currentProcess && { process: `${this.currentProcess}` }),
      ...(this.currentStatus && { status: `${this.currentStatus}` }),
      ...(this.imageId && { imagefileid: `${this.imageId}` }),
      ...{
        addressinfo: JSON.stringify([formData.address1, formData.address2]),
      },
      ...{ schooladdrinfo: JSON.stringify(formData.workplace) },
      ...{ eduinfo: JSON.stringify({ educationType, ...educationLevelForm }) },
      ...{
        experienceinfo: JSON.stringify(formData.experience),
      },
      ...{ competencyinfo: JSON.stringify(mockPerformances) },
      ...{ prohibitproperty: JSON.stringify(forbidden) },
      ...{
        fileinfo: JSON.stringify({
          edufiles,
          experiencefiles,
          performancefiles,
        }),
      },
    };
    //console.log('payload = ', payload);
    return payload;
  }
}

const mockPerformances = [
  {
    id: 1,
    score: '89',
    result: 'ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
  {
    id: 2,
    score: '96',
    result: 'ผ่าน',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
  {
    id: 3,
    score: '96',
    result: 'ไม่พบข้อมูล',
    announceDate: '12/มกราคม/2565',
    endDate: '31/มกราคม/2565',
  },
];
