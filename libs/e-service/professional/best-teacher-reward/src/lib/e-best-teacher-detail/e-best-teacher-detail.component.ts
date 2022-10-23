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
  selector: 'ksp-e-best-teacher-detail',
  templateUrl: './e-best-teacher-detail.component.html',
  styleUrls: ['./e-best-teacher-detail.component.scss'],
})
export class EBestTeacherDetailComponent implements OnInit {
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
  requestId!: number;

  form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    workplace: [],
    rewardTeacherInfo: [],
    eduInfo: [],
    teachingInfo: [],
    rewardDetailInfo: [],
    phone: [],
    fax: [],
    email: [],
    website: [],
  });

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.getListData();
    this.checkRequestId();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.provinces3$ = this.provinces1$;
    this.provinces4$ = this.provinces1$;
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
      rewardteacherinfo,
      eduinfo,
      rewarddetailinfo,
      teachinginfo,
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

    const rewardTeacherInfo = parseJson(rewardteacherinfo);
    const eduInfo = parseJson(eduinfo);
    const teachingInfo = parseJson(teachinginfo);
    const rewardDetailInfo = parseJson(rewarddetailinfo);
    if (teachingInfo) {
      this.amphurs3$ = this.addressService.getAmphurs(teachingInfo.province);
      this.tumbols3$ = this.addressService.getTumbols(teachingInfo.district);
      this.amphurs4$ = this.addressService.getAmphurs(
        teachingInfo.currentProvince
      );
      this.tumbols4$ = this.addressService.getTumbols(
        teachingInfo.currentDistrict
      );
    }
    this.form.patchValue(<any>{
      rewardTeacherInfo,
      eduInfo,
      rewardDetailInfo,
      teachingInfo,
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
