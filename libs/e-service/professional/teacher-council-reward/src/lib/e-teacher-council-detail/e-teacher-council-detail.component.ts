import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ERewardFormBaseComponent } from '@ksp/self-service/form';

const FORM_TAB_COUNT = 7;

@Component({
  selector: 'ksp-e-teacher-council-detail',
  templateUrl: './e-teacher-council-detail.component.html',
  styleUrls: ['./e-teacher-council-detail.component.scss'],
})
export class ETeacherCouncilDetailComponent
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
  prefixList$!: Observable<any>;
  bureau$!: Observable<any>;
  uniqueTimestamp!: string;
  rewardFiles: any[] = [];

  form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    address1: [],
    address2: [],
    eduInfo: [],
    hiringInfo: [],
    rewardEthicInfo: [],
    rewardSuccessInfo: [],
    rewardDetailInfo: [],
    checkResult: this.fb.array([]),
  });

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private route: ActivatedRoute,
    private requestService: ERequestService,
    private addressService: AddressService,
    private educationDetailService: EducationDetailService,
    private router: Router
  ) {
    super();
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
    this.bureau$ = this.educationDetailService.getBureau();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              this.requestData = res;
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
      eduinfo,
      hiringinfo,
      rewardethicinfo,
      rewardsuccessinfo,
      rewarddetailinfo,
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
    const eduInfo = parseJson(eduinfo);
    const hiringInfo = parseJson(hiringinfo);
    const rewardEthicInfo = parseJson(rewardethicinfo);
    const rewardSuccessInfo = parseJson(rewardsuccessinfo);
    const rewardDetailInfo = parseJson(rewarddetailinfo);
    this.form.patchValue({
      eduInfo,
      hiringInfo,
      rewardEthicInfo,
      rewardSuccessInfo,
      rewardDetailInfo,
    });

    if (fileinfo) {
      const { rewardfiles } = parseJson(fileinfo);
      this.rewardFiles = rewardfiles;
    }
  }

  patchAddressInfo(value: any) {
    if (value?.length) {
      value.map((addr: any, i: number) => {
        if (i === 0) {
          this.amphurs1$ = this.addressService.getAmphurs(addr.province);
          this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.address1.patchValue(addr);
        }
        if (i === 1) {
          this.amphurs2$ = this.addressService.getAmphurs(addr.province);
          this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.address2.patchValue(addr);
        }
      });
    }
  }

  next() {
    this.persistData(this.form.controls.checkResult.value);
    this.router.navigate(['/teacher-council', 'confirm', this.requestId]);
  }

  cancel() {
    this.router.navigate(['/teacher-council']);
  }
}
