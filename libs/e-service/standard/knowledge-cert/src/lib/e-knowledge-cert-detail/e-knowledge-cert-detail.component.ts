import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { ESelfFormBaseComponent } from '@ksp/shared/form/others';
import { SelfGetRequest } from '@ksp/shared/interface';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  ERequestService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 4;

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
  transferFiles: any[] = [];
  provinces$!: Observable<any>;

  userInfoType = UserInfoFormType.thai;

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    educationInfo: [],
    transferKnowledgeInfo: [],
    checkResult: this.fb.array([]),
  });

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

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
    route: ActivatedRoute,
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

  override patchData(data: SelfGetRequest): void {
    super.patchData(data);
    if (data.eduinfo) {
      const eduInfo = parseJson(data.eduinfo);
      this.form.controls.educationInfo.patchValue({
        ...eduInfo,
      } as any);
    }

    if (data.transferknowledgeinfo) {
      const transferKnowledgeInfo = parseJson(data.transferknowledgeinfo);
      console.log(transferKnowledgeInfo);
      this.form.controls.transferKnowledgeInfo.patchValue({
        ...transferKnowledgeInfo,
      });
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { edufiles, transferknowledgeinfofiles } = fileInfo;
      this.eduFiles = edufiles;
      this.transferFiles = transferknowledgeinfofiles;
    }
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
    this.router.navigate(['/knowledge-cert/', 'confirm', this.requestId]);
  }

  cancel() {
    this.router.navigate(['/knowledge-cert/', 'list']);
  }
}
