import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { ESelfFormBaseComponent } from '@ksp/shared/form/others';
import { Country, FileGroup, Province } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 6;
@Component({
  selector: 'ksp-request-license-approve-detail',
  templateUrl: './request-license-approve-detail.component.html',
  styleUrls: ['./request-license-approve-detail.component.scss'],
})
export class RequestLicenseApproveDetailComponent
  extends ESelfFormBaseComponent
  implements OnInit
{
  approveTitles = 'ผลการตรวจสอบ';
  userInfoType = UserInfoFormType.thai;
  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    education: [],
    experience: [],
    checkResult: this.fb.array([]),
  });

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  countries$!: Observable<Country[]>;
  countries2$!: Observable<Country[]>;
  licenses$!: Observable<any>;
  disableNextButton = false;
  eduFiles: FileGroup[] = [];
  experienceFiles: FileGroup[] = [];
  provinces$!: Observable<Province[]>;

  educationTypes: 'teacher' | 'schManager' | 'eduManager' | 'supervision' =
    'teacher';

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

  override checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              //console.log(res);
              this.requestData = res;
              this.patchData(res);
              switch (res.careertype) {
                case '1':
                  this.educationTypes = 'teacher';
                  break;
                case '2':
                  this.educationTypes = 'schManager';
                  break;
                case '3':
                  this.educationTypes = 'eduManager';
                  break;
                case '4':
                  this.educationTypes = 'supervision';
                  break;
                default:
                  this.educationTypes = 'teacher';
              }
            }
          });
      }
    });
  }

  override patchData(data: any) {
    super.patchData(data);

    if (data.eduinfo) {
      const eduInfo = parseJson(data.eduinfo);
      const { educationType, ...educationLevelForm } = eduInfo;
      this.form.controls.education.patchValue({
        educationType,
        educationLevelForm,
      } as any);
    }

    if (data.experienceinfo) {
      const experienceInfo = parseJson(data.experienceinfo);
      this.form.controls.experience.patchValue({ ...experienceInfo });
    }
  }

  override getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.countries$ = this.addressService.getCountry();
    this.countries2$ = this.countries$;
    this.licenses$ = this.educationDetailService.getLicenseType();
    this.provinces$ = this.addressService.getProvinces();
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
    this.router.navigate([
      '/request-license',
      'approve-confirm',
      this.requestId,
    ]);
  }

  cancel() {
    this.router.navigate(['/request-license', 'approve-list']);
  }
}
