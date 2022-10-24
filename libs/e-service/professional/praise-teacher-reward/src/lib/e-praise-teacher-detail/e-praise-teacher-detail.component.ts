import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { SelfRequest } from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-praise-teacher-detail',
  templateUrl: './e-praise-teacher-detail.component.html',
  styleUrls: ['./e-praise-teacher-detail.component.scss'],
})
export class EPraiseTeacherDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  bureaus$!: Observable<any>;
  prefixList$!: Observable<any>;
  requestId!: number;

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
  });

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private route: ActivatedRoute,
    private requestService: ERequestService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.getListData();
    this.checkRequestId();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              this.patchData(res);
            }
          });
      }
    });
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
      rewarddetailinfo,
      eduinfo,
      hiringinfo,
      rewardpunishmentinfo,
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

    const eduInfo = parseJson(eduinfo);
    const hiringInfo = parseJson(hiringinfo);
    const rewardDetailInfo = parseJson(rewarddetailinfo);
    const rewardPunishmentInfo = parseJson(rewardpunishmentinfo);
    this.form.patchValue({
      eduInfo,
      hiringInfo,
      rewardDetailInfo,
      rewardPunishmentInfo,
    });
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
}
