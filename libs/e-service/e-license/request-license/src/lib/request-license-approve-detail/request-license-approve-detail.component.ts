import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-request-license-approve-detail',
  templateUrl: './request-license-approve-detail.component.html',
  styleUrls: ['./request-license-approve-detail.component.scss'],
})
export class RequestLicenseApproveDetailComponent implements OnInit {
  approveTitles = 'ผลการตรวจสอบ';

  approveChoices = choices;

  userInfoType = UserInfoFormType.thai;
  form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    education: [],
    experience: [],
  });

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  countries$!: Observable<any>;
  countries2$!: Observable<any>;
  licenses$!: Observable<any>;
  disableNextButton = false;
  eduFiles: any[] = [];
  experienceFiles: any[] = [];
  prefixList$!: Observable<any>;
  nationalitys$!: Observable<any>;
  provinces$!: Observable<any>;

  tumbols1$!: Observable<any>;
  tumbols2$!: Observable<any>;
  tumbols3$!: Observable<any>;
  amphurs1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  amphurs3$!: Observable<any>;

  requestId!: number;
  educationTypes: 'teacher' | 'schManager' | 'eduManager' | 'supervision' =
    'teacher';

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService,
    private educationDetailService: EducationDetailService,
    private route: ActivatedRoute,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.getListData();
    this.checkRequestId();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              console.log(res);
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

  patchData(data: any) {
    this.form.controls.userInfo.patchValue(data);
    this.patchAddress(parseJson(data.addressinfo));
    if (data.schooladdrinfo) {
      this.patchWorkplace(parseJson(data.schooladdrinfo));
    }

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
      console.log(experienceInfo);
      this.form.controls.experience.patchValue({ ...experienceInfo });
    }
  }

  patchWorkplace(data: any) {
    this.amphurs3$ = this.addressService.getAmphurs(data.province);
    this.tumbols3$ = this.addressService.getTumbols(data.district);
    this.form.controls.workplace.patchValue(data);
  }

  patchAddress(addrs: any[]) {
    if (addrs && addrs.length) {
      addrs.map((addr: any, i: number) => {
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

  getListData() {
    this.countries$ = this.addressService.getCountry();
    this.countries2$ = this.countries$;
    this.licenses$ = this.educationDetailService.getLicenseType();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.provinces$ = this.addressService.getProvinces();
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
