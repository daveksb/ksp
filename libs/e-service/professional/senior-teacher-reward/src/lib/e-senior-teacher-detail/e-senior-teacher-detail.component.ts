import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardFormBaseComponent } from '@ksp/self-service/form';
import { UserInfoFormType } from '@ksp/shared/constant';
import { SelfRequest } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 6;

@Component({
  selector: 'ksp-e-senior-teacher-detail',
  templateUrl: './e-senior-teacher-detail.component.html',
  styleUrls: ['./e-senior-teacher-detail.component.scss'],
})
export class ESeniorTeacherDetailComponent
  extends ERewardFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;

  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  bureaus$!: Observable<any>;
  prefixList$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    workplace: [],
    rewardCareerInfo: [],
    rewardPunishmentInfo: [],
    rewardMoneySupportInfo: [],

    phone: [],
    fax: [],
    email: [],
    website: [],
    checkResult: this.fb.array([]),
  });

  rewardFiles: any[] = [];
  moneyAssistanceFiles: any[] = [];

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private educationDetailService: EducationDetailService,
    route: ActivatedRoute,
    requestService: ERequestService,
    private router: Router
  ) {
    super(route, requestService);
  }

  ngOnInit(): void {
    this.verifyChoice = this.VERIFY_CHOICES;
    this.getListData();
    this.checkRequestId();
    this.addCheckResultArray();
  }

  addCheckResultArray() {
    for (let i = 0; i < FORM_TAB_COUNT; i++) {
      this.checkResultFormArray.push(this.fb.control([]));
    }
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.bureaus$ = this.educationDetailService.getBureau();
  }

  patchData(data: SelfRequest) {
    const {
      prefixth,
      prefixen,
      firstnameth,
      firstnameen,
      lastnameth,
      lastnameen,
      sex,
      birthdate,
      contactphone,
      workphone,
      email,
      addressinfo,
      schooladdrinfo,
      rewardcareerinfo,
      rewardpunishmentinfo,
      rewardmoneysupportinfo,
      fileinfo,
    } = data;
    const myInfo = <any>{
      prefixth,
      prefixen,
      firstnameth,
      firstnameen,
      lastnameth,
      lastnameen,
      sex,
      birthdate: birthdate?.split('T')[0],
      contactphone,
      workphone,
      email,
    };
    this.form.controls.userInfo.patchValue(myInfo);

    const addressInfo = parseJson(addressinfo);
    this.patchAddressInfo(addressInfo);

    const workplaceInfo = parseJson(schooladdrinfo);
    this.patchWorkplaceInfo(workplaceInfo);

    const rewardCareerInfo = parseJson(rewardcareerinfo);
    const rewardPunishmentInfo = parseJson(rewardpunishmentinfo);
    const rewardMoneySupportInfo = parseJson(rewardmoneysupportinfo);
    this.form.patchValue(<any>{
      rewardCareerInfo,
      rewardPunishmentInfo,
      rewardMoneySupportInfo,
    });

    if (fileinfo) {
      const { rewardfiles, moneyassistancefiles } = parseJson(fileinfo);
      this.rewardFiles = rewardfiles;
      this.moneyAssistanceFiles = moneyassistancefiles;
    }
  }

  patchAddressInfo(value: any) {
    if (value) {
      this.amphurs1$ = this.addressService.getAmphurs(value.province);
      this.tumbols1$ = this.addressService.getTumbols(value.amphur);
      this.form.controls.addressInfo.patchValue(value);
    }
  }

  patchWorkplaceInfo(value: any) {
    if (value) {
      this.amphurs2$ = this.addressService.getAmphurs(value.province);
      this.tumbols2$ = this.addressService.getTumbols(value.amphur);
      const { phone, fax, email, website } = value || {
        phone: '',
        fax: '',
        email: '',
        website: '',
      };
      this.form.controls.workplace.patchValue(value);
      this.form.patchValue({
        phone,
        fax,
        email,
        website,
      });
    }
  }

  next() {
    this.persistData(this.form.controls.checkResult.value);
    this.router.navigate(['/senior-teacher', 'confirm', this.requestId]);
  }

  cancel() {
    this.router.navigate(['/senior-teacher']);
  }
}
