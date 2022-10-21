import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { ESelfFormBaseComponent } from '@ksp/shared/form/others';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-compare-knowledge-detail',
  templateUrl: './e-compare-knowledge-detail.component.html',
  styleUrls: ['./e-compare-knowledge-detail.component.scss'],
})
export class ECompareKnowledgeDetailComponent
  extends ESelfFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;

  countries$!: Observable<any>;
  countries2$!: Observable<any>;
  licenses$!: Observable<any>;

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    educationInfo: [],
    testResultCompareInfo: [],
  });

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  choices = [
    {
      name: 'ครบถ้วน และถูกต้อง',
      value: 2,
    },
    {
      name: 'ไม่ครบถ้วน และถูกต้อง',
      value: 3,
    },
  ];

  constructor(
    generalInfoService: GeneralInfoService,
    addressService: AddressService,
    educationDetailService: EducationDetailService,
    fb: FormBuilder,
    requestService: ERequestService,
    route: ActivatedRoute
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
}
