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

const FORM_TAB_COUNT = 6;

@Component({
  selector: 'ksp-e-research-reward-detail',
  templateUrl: './e-research-reward-detail.component.html',
  styleUrls: ['./e-research-reward-detail.component.scss'],
})
export class EResearchRewardDetailComponent
  extends ERewardFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;

  provinces$!: Observable<any>;
  amphurs$!: Observable<any>;
  tumbols$!: Observable<any>;
  bureaus$!: Observable<any>;
  prefixList$!: Observable<any>;
  rewardFiles: any[] = [];

  form = this.fb.group({
    userInfo: [],
    workplace: [],
    rewardResearcherInfo: [],
    rewardResearchInfo: [],
    rewardResearchHistory: [],

    phone: [],
    fax: [],
    email: [],
    website: [],
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
    this.provinces$ = this.addressService.getProvinces();
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
      schooladdrinfo,
      rewardresearcherinfo,
      rewardresearchinfo,
      rewardresearchhistory,
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
    const workplaceInfo = parseJson(schooladdrinfo);
    this.patchWorkplaceInfo(workplaceInfo);

    const rewardResearcherInfo = parseJson(rewardresearcherinfo);
    const rewardResearchInfo = parseJson(rewardresearchinfo);
    const rewardResearchHistory = parseJson(rewardresearchhistory);
    this.form.patchValue(<any>{
      rewardResearcherInfo,
      rewardResearchInfo,
      rewardResearchHistory,
    });

    if (fileinfo) {
      const { rewardfiles } = parseJson(fileinfo);
      this.rewardFiles = rewardfiles;
    }
  }

  patchWorkplaceInfo(value: any) {
    if (value) {
      this.amphurs$ = this.addressService.getAmphurs(value.province);
      this.tumbols$ = this.addressService.getTumbols(value.amphur);
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
    this.router.navigate(['/research-reward', 'confirm', this.requestId]);
  }

  cancel() {
    this.router.navigate(['/research-reward']);
  }
}
