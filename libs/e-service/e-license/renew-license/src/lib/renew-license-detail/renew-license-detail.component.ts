import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { ESelfFormBaseComponent } from '@ksp/shared/form/others';
import { FileGroup } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 4;

@Component({
  selector: 'ksp-renew-license-detail',
  templateUrl: './renew-license-detail.component.html',
  styleUrls: ['./renew-license-detail.component.scss'],
})
export class RenewLicenseDetailComponent
  extends ESelfFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    education: [],
    experience: [],
    educationForm: [],
    standardWorking: [],
    checkResult: this.fb.array([]),
  });

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  countries$!: Observable<any>;
  countries2$!: Observable<any>;
  licenses$!: Observable<any>;
  disableNextButton = false;
  eduFiles: any[] = [];
  experienceFiles: any[] = [];
  provinces$!: Observable<any>;
  educationType: 'teacher' | 'schManager' | 'eduManager' | 'supervision' =
    'teacher';

  workingInfoFiles: FileGroup[] = [];
  workingInfoFiles2: FileGroup[] = [];
  licenseFiles: FileGroup[] = [];

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
              console.log(res);
              this.requestData = res;
              switch (res.careertype) {
                case '1':
                  this.educationType = 'teacher';
                  break;
                case '2':
                  this.educationType = 'schManager';
                  console.log(this.educationType);
                  break;
                case '3':
                  this.educationType = 'eduManager';
                  break;
                case '4':
                  this.educationType = 'supervision';
                  break;
                default:
                  this.educationType = 'teacher';
              }
              this.patchData(res);
            }
          });
      }
    });
  }

  override patchData(data: any) {
    super.patchData(data);

    if (data.eduinfo) {
      const eduInfo = parseJson(data.eduinfo);
      console.log(eduInfo);
      const { educationType, ...educationLevelForm } = eduInfo;
      this.form.controls.educationForm.patchValue({
        educationType,
        educationLevelForm,
      } as any);
    }

    if (data.performanceinfo) {
      const performanceInfo = parseJson(data.performanceinfo);
      console.log(performanceInfo);
      console.log(this.educationType);
      if (this.educationType === 'teacher') {
        const { educationType, ...educationLevelForm } = performanceInfo;
        this.form.controls.standardWorking.patchValue({
          educationType,
          educationLevelForm,
        } as any);
      } else {
        const { standardType, ...standardLevelForm } = performanceInfo;
        console.log(standardType);
        this.form.controls.standardWorking.patchValue({
          educationType: standardType,
          educationLevelForm: standardLevelForm,
        } as any);
      }
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { performancefiles, licensefiles, performancefiles2 } = fileInfo;
      this.workingInfoFiles = performancefiles;
      this.workingInfoFiles2 = performancefiles2;
      this.licenseFiles = licensefiles;
    }
  }

  override getListData() {
    this.countries$ = this.addressService.getCountry();
    this.countries2$ = this.countries$;
    this.licenses$ = this.educationDetailService.getLicenseType();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.provinces$ = this.addressService.getProvinces();
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
    this.router.navigate(['/renew-license', 'approve-confirm', this.requestId]);
  }

  cancel() {
    this.router.navigate(['/renew-license', 'approve-list']);
  }
}
