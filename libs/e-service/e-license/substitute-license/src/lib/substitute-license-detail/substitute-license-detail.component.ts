import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { ESelfFormBaseComponent } from '@ksp/shared/form/others';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 3;

@Component({
  selector: 'ksp-substitute-license-detail',
  templateUrl: './substitute-license-detail.component.html',
  styleUrls: ['./substitute-license-detail.component.scss'],
})
export class SubstituteLicenseDetailComponent
  extends ESelfFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;
  approveChoices = choices;

  countries$!: Observable<any>;
  countries2$!: Observable<any>;
  licenses$!: Observable<any>;
  disableNextButton = false;
  eduFiles: any[] = [];
  experienceFiles: any[] = [];
  provinces$!: Observable<any>;

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    replaceReasonInfo: [],
    checkResult: this.fb.array([]),
  });

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  constructor(
    fb: FormBuilder,
    addressService: AddressService,
    generalInfoService: GeneralInfoService,
    educationDetailService: EducationDetailService,
    route: ActivatedRoute,
    requestService: ERequestService,
    private router: Router
  ) {
    super(
      generalInfoService,
      addressService,
      educationDetailService,
      fb,
      requestService,
      route
    );
  }

  ngOnInit(): void {
    this.getListData();
    this.checkRequestId();
    this.addCheckResultArray();
  }

  addCheckResultArray() {
    for (let i = 0; i < FORM_TAB_COUNT; i++) {
      this.checkResultFormArray.push(this.fb.control(null));
    }
    this.checkResultFormArray.setValidators(
      ESelfFormBaseComponent.allFilledValidator()
    );
  }

  override patchData(data: any) {
    super.patchData(data);

    if (data.replacereasoninfo) {
      const replaceReasonInfo = parseJson(data.replacereasoninfo);
      this.form.controls.replaceReasonInfo.patchValue(replaceReasonInfo);
    }
  }

  override getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.provinces$ = this.addressService.getProvinces();
    this.countries$ = this.addressService.getCountry();
    this.countries2$ = this.countries$;
    this.licenses$ = this.educationDetailService.getLicenseType();
    this.bureau$ = this.educationDetailService.getBureau();
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

  next() {
    ESelfFormBaseComponent.persistData(
      this.form.controls.checkResult.value,
      this.requestData
    );
    this.router.navigate(['/sub-license', 'approve-confirm', this.requestId]);
  }

  cancel() {
    this.router.navigate(['/sub-license', 'approve-list']);
  }
}

const choices = [
  {
    name: 'ครบถ้วน และถูกต้อง',
    value: 2,
  },
  {
    name: 'ไม่ครบถ้วน และถูกต้อง',
    value: 3,
  },
];
