import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { LicenseRequestService } from './license-request.service';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import { SelfRequest } from '@ksp/shared/interface';
import {
  getCookie,
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
  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    education: [],
    experience: [],
  });
  countries$!: Observable<any>;
  countries2$!: Observable<any>;
  licenses$!: Observable<any>;
  disableNextButton = false;
  eduFiles: any[] = [];
  experienceFiles: any[] = [];

  constructor(
    router: Router,
    dialog: MatDialog,
    fb: FormBuilder,
    public service: LicenseRequestService,
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
    this.initializeFiles();
  }

  override initializeFiles() {
    this.uniqueTimestamp = uuidv4();
    this.eduFiles = structuredClone(this.service.educationFiles);
    this.experienceFiles = structuredClone(this.service.experienceFiles);
  }

  override getListData() {
    super.getListData();
    this.countries$ = this.addressService.getCountry();
    this.countries2$ = this.countries$;
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
    console.log(this.form.controls.address1.value);
    this.form.controls.address2.patchValue(this.form.controls.address1.value);
    console.log(this.form.controls.address2.value);
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
      SelfServiceRequestType.ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ,
      `${SelfServiceRequestSubType.ครู}`,
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

    const { educationType, educationLevelForm } = formData?.education || {
      educationType: null,
      educationLevelForm: null,
    };
    const { hasForeignLicense, foreignLicenseForm, ...resExperienceForm } =
      formData.experience || {
        hasForeignLicense: null,
        foreignLicenseForm: null,
      };

    const edufiles = this.mapFileInfo(this.eduFiles);
    const experiencefiles = this.mapFileInfo(this.experienceFiles);

    const payload = {
      ...self,
      ...replaceEmptyWithNull(selectData),
      ...{
        addressinfo: JSON.stringify([formData.address1, formData.address2]),
      },
      ...{ schooladdrinfo: JSON.stringify(formData.workplace) },
      ...{ eduinfo: JSON.stringify({ educationType, ...educationLevelForm }) },
      ...{
        experienceinfo: JSON.stringify({
          hasForeignLicense,
          ...resExperienceForm,
          ...(hasForeignLicense && { ...foreignLicenseForm }),
        }),
      },
      ...{ competencyinfo: JSON.stringify(mockPerformances) },
      ...{ prohibitproperty: JSON.stringify(forbidden) },
      ...{ fileinfo: JSON.stringify({ edufiles, experiencefiles }) },
    };
    console.log(payload);
    return payload;
  }

  checkButtonsDisableStatus() {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      this.disableNextButton = false; // !this.form.valid;
    });
  }
}
