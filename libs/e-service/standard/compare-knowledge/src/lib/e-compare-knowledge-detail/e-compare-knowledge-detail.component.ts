import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { ESelfFormBaseComponent } from '@ksp/shared/form/others';
import { SelfGetRequest } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 5;

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
  selectedTabIndex = 0;
  countries$!: Observable<any>;
  licenses$!: Observable<any>;

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    educationInfo: [],
    testResultCompareInfo: [],
    checkResult: this.fb.array([]),
  });

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

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
  objectiveFiles: any[] = [];

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
    this.countries$ = this.addressService.getCountry();
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

    if (data.testresultcompareinfo) {
      const testResultCompareInfo = parseJson(data.testresultcompareinfo);
      //console.log(testResultCompareInfo);
      this.form.controls.testResultCompareInfo.patchValue({
        ...testResultCompareInfo,
      } as any);
      //console.log('eduInfo= ', testResultCompareInfo);
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { attachfiles } = fileInfo;
      this.objectiveFiles = attachfiles;
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

  nextTab() {
    if (this.selectedTabIndex < 4) {
      this.selectedTabIndex++;
    } else {
      this.next();
    }
  }

  prevTab() {
    if (this.selectedTabIndex == 0) {
      this.cancel();
    } else {
      this.selectedTabIndex--;
    }
  }

  next() {
    ESelfFormBaseComponent.persistData(
      this.form.controls.checkResult.value,
      this.requestData
    );
    this.router.navigate(['/compare-knowledge', 'confirm', this.requestId]);
  }

  cancel() {
    this.router.navigate(['/compare-knowledge', 'list']);
  }
}
