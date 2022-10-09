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
  selector: 'ksp-substitute-license-detail',
  templateUrl: './substitute-license-detail.component.html',
  styleUrls: ['./substitute-license-detail.component.scss'],
})
export class SubstituteLicenseDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;
  approveChoices = choices;

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
        this.requestService.getRequestById(this.requestId).subscribe((res) => {
          if (res) {
            this.patchData(res);
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
        }
        if (i === 1) {
          this.amphurs2$ = this.addressService.getAmphurs(addr.province);
          this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
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
