import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { ESelfFormBaseComponent } from '@ksp/shared/form/others';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  ERequestService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-knowledge-cert-detail',
  templateUrl: './e-knowledge-cert-detail.component.html',
  styleUrls: ['./e-knowledge-cert-detail.component.scss'],
})
export class EKnowledgeCertDetailComponent
  extends ESelfFormBaseComponent
  implements OnInit
{
  countries$!: Observable<any>;
  countries2$!: Observable<any>;
  licenses$!: Observable<any>;
  disableNextButton = false;
  eduFiles: any[] = [];
  experienceFiles: any[] = [];
  provinces$!: Observable<any>;

  userInfoType = UserInfoFormType.thai;

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    education: [],
    tranferData: [],
  });

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  workingInfoFiles = [
    {
      name: '1.รางวัลอื่นและประกาศเกียรติคุณ',
      fileid: '',
      filename: '',
    },
  ];

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
