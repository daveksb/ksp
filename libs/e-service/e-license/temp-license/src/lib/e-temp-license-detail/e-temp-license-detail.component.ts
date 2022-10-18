import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { levels, subjects, UserInfoFormType } from '@ksp/shared/constant';

import {
  AddressService,
  ERequestService,
  GeneralInfoService,
  StaffService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { TempLicenseDetailService } from './e-temp-license-detail.service';
import localForage from 'localforage';
import {
  Amphur,
  FileGroup,
  KspRequest,
  PositionType,
  Prefix,
  Province,
  Tambol,
} from '@ksp/shared/interface';

export interface KspApprovePersistData {
  checkDetail: any;
  requestData: KspRequest;
}
@UntilDestroy()
@Component({
  selector: 'e-service-temp-license-detail',
  templateUrl: './e-temp-license-detail.component.html',
  styleUrls: ['./e-temp-license-detail.component.scss'],
})
export class ETempLicenseDetailComponent implements OnInit {
  verifyChoice: any[] = [];
  selectedTabIndex = 0;
  evidenceFiles: FileGroup[] = [];

  amphurs1$!: Observable<Amphur[]>;
  tumbols1$!: Observable<Tambol[]>;
  amphurs2$!: Observable<Amphur[]>;
  tumbols2$!: Observable<Tambol[]>;
  provinces$!: Observable<Province[]>;
  prefixList$!: Observable<Prefix[]>;
  positionTypes$!: Observable<PositionType[]>;
  selectedTab: MatTabChangeEvent = new MatTabChangeEvent();

  requestId!: number;
  requestData = new KspRequest();
  userInfoFormType: number = UserInfoFormType.thai; // control the display field of user info form

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    schoolAddr: [],
    edu1: [],
    edu2: [],
    teachinginfo: [],
    hiringinfo: [],
    checkResult: this.fb.array([]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: TempLicenseDetailService,
    private eRequestService: ERequestService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.verifyChoice = this.service.verifyChoice;
    this.evidenceFiles = this.service.evidenceFiles;
    this.getList();
    this.checkRequestId();
    this.addCheckResultArray();
  }

  addCheckResultArray() {
    for (let i = 0; i < 6; i++) {
      this.checkResultFormArray.push(this.fb.control([]));
    }
  }

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  tabChanged(e: MatTabChangeEvent) {
    //console.log('tab event = ', e);
    this.selectedTab = e;
  }

  next() {
    this.persistData();
    this.router.navigate(['/temp-license', 'confirm', this.requestId]);
  }

  // save data to indexed db
  persistData() {
    //console.log('check sub result = ', checkSubResult);
    const saveData: KspApprovePersistData = {
      checkDetail: this.form.controls.checkResult.value,
      requestData: this.requestData,
    };
    localForage.setItem('checkRequestData', saveData);
  }

  checkRequestId() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      this.requestId = Number(params.get('id'));
      //console.log('req id = ', this.requestId);
      if (this.requestId) {
        this.loadRequestFromId(this.requestId);
      }
    });
  }

  loadRequestFromId(requestId: number) {
    this.eRequestService.getKspRequestById(requestId).subscribe((res) => {
      this.requestData = res;
      this.pathUserInfo(res);
      this.patchAddress(parseJson(res.addressinfo));
      this.patchEdu(parseJson(res.eduinfo));
      this.patchHiringInfo(parseJson(res.hiringinfo));
      this.patchTeachingInfo(parseJson(res.teachinginfo));
      this.patchSchoolAddrress(parseJson(res.schooladdrinfo));
    });
  }

  patchSchoolAddrress(payload: any) {
    if (!payload) return;
    this.form.controls.schoolAddr.patchValue(payload);
  }

  pathUserInfo(data: any) {
    data.birthdate = data.birthdate.split('T')[0];
    this.form.controls.userInfo.patchValue(data);
  }

  patchAddress(addrs: any[]) {
    //console.log('address = ', addrs);
    if (addrs && addrs.length) {
      addrs.map((addr: any, i: number) => {
        if (i === 0) {
          this.amphurs1$ = this.addressService.getAmphurs(addr.province);
          this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.addr1.patchValue(addr);
        }
        if (i === 1) {
          this.amphurs2$ = this.addressService.getAmphurs(addr.province);
          this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.addr2.patchValue(addr);
        }
      });
    }
  }

  patchEdu(edus: any[]) {
    //console.log('edu = ', edus);
    if (edus && edus.length) {
      edus.map((edu, i) => {
        if (i === 0) {
          this.form.controls.edu1.patchValue(edu);
        }
        if (i === 1) {
          this.form.controls.edu2.patchValue(edu);
        }
      });
    }
  }

  patchTeachingInfo(res: any) {
    if (!res || !res.teachingLevel) return;

    const teachingLevel = levels.map((level) => {
      if (res.teachingLevel.includes(level.value)) {
        return level.value;
      } else {
        return false;
      }
    });

    const teachingSubjects = subjects.map((subj) => {
      if (res.teachingSubjects.includes(subj.value)) {
        return subj.value;
      } else {
        return false;
      }
    });
    const data = {
      ...res,
      teachingLevel,
      teachingSubjects,
    };
    this.form.controls.teachinginfo.patchValue(data);
  }

  patchHiringInfo(data: any) {
    this.form.controls.hiringinfo.patchValue(data);
  }

  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces$ = this.addressService.getProvinces();
    this.positionTypes$ = this.staffService.getPositionTypes();
  }

  cancel() {
    this.router.navigate(['/temp-license']);
  }

  prevPage() {
    this.router.navigate(['/temp-license', 'list']);
  }
}
