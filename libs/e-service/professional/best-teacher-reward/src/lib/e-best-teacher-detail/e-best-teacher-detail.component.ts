import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardFormBaseComponent } from '@ksp/self-service/form';
import { UserInfoFormType } from '@ksp/shared/constant';
import { SelfRequest } from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 7;

@Component({
  selector: 'ksp-e-best-teacher-detail',
  templateUrl: './e-best-teacher-detail.component.html',
  styleUrls: ['./e-best-teacher-detail.component.scss'],
})
export class EBestTeacherDetailComponent
  extends ERewardFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;

  prefixList$!: Observable<any>;
  bureau$!: Observable<any>;
  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  provinces3$!: Observable<any>;
  amphurs3$!: Observable<any>;
  tumbols3$!: Observable<any>;
  provinces4$!: Observable<any>;
  amphurs4$!: Observable<any>;
  tumbols4$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    workplace: [],

    eduInfo: [],
    hiringInfo: [],
    rewardDetailInfo: [],
    rewardPunishmentInfo: [],

    phone: [],
    fax: [],
    email: [],
    website: [],
    checkResult: this.fb.array([]),
  });

  rewardFiles: any[] = [];

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
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
    this.provinces3$ = this.provinces1$;
    this.provinces4$ = this.provinces1$;
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
      eduinfo,
      rewarddetailinfo,
      hiringinfo,
      rewardpunishmentinfo,
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
    console.log(myInfo);
    this.form.controls.userInfo.patchValue(myInfo);

    const addressInfo = parseJson(addressinfo);
    this.patchAddressInfo(addressInfo);

    const workplaceInfo = parseJson(schooladdrinfo);
    this.patchWorkplaceInfo(workplaceInfo);

    const eduInfo = parseJson(eduinfo);
    const hiringInfo = parseJson(hiringinfo);
    const rewardDetailInfo = parseJson(rewarddetailinfo);
    const rewardPunishmentInfo = parseJson(rewardpunishmentinfo);

    this.form.patchValue(<any>{
      eduInfo,
      hiringInfo,
      rewardDetailInfo,
      rewardPunishmentInfo,
    });

    if (fileinfo) {
      const { rewardfiles } = parseJson(fileinfo);
      this.rewardFiles = rewardfiles;
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
    this.router.navigate(['/best-teacher', 'confirm', this.requestId]);
  }

  cancel() {
    this.router.navigate(['/thai-teacher']);
  }
}
