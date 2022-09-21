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
import { parseJson, thaiDate } from '@ksp/shared/utility';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { TempLicenseDetailService } from './e-temp-license-detail.service';

@Component({
  selector: 'e-service-temp-license-detail',
  templateUrl: './e-temp-license-detail.component.html',
  styleUrls: ['./e-temp-license-detail.component.scss'],
})
export class ETempLicenseDetailComponent implements OnInit {
  //reason: string[][] = [];
  verifyChoice: any[] = [];
  selectedTabIndex = 0;
  //educationInfo: string[] = [];
  //: string[] = [];
  //reasonInfo: string[] = [];
  evidenceFiles: any[] = [];

  today = thaiDate(new Date());
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  provinces$!: Observable<any>;
  prefixList$!: Observable<any>;
  positionTypes$!: Observable<any>;
  selectedTab!: MatTabChangeEvent;

  //schoolId = '0010201056';
  requestId!: number;
  requestData: any;
  requestNo!: string | null;
  //requestSubType = SchoolRequestSubType.ครู;
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
    /* this.reason = this.service.reason; */
    this.verifyChoice = this.service.verifyChoice;
    this.evidenceFiles = this.service.evidenceFiles;
    /*  this.educationInfo = this.service.educationInfo;
    this.teachingInfo = this.service.teachingInfo;
    this.reasonInfo = this.service.reasonInfo; */
    //this.evidenceFiles = this.service.evidenceFiles;
    this.getList();
    this.checkRequestId();
    this.checkResultFormArray.push(this.fb.control([]));
  }

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  tabChanged(e: MatTabChangeEvent) {
    console.log('tab event = ', e);
    this.selectedTab = e;
  }

  checkRequest() {
    console.log('form value = ', this.form.value);
    const payload = {
      id: `${this.requestId}`,
      checksubresult: "{'field1':'data1','field2':'data2','field3':'data3'}",
      checkfinalresult: "{'field1':'data1','field2':'data2','field3':'data3'}",
      checkhistory: "{'field1':'data1','field2':'data2','field3':'data3'}",
      approveresult: "{'field1':'data1','field2':'data2','field3':'data3'}",
    };

    /*     this.eRequestService.checkRequest(payload).subscribe((res) => {
      console.log('check result = ', res);
    }); */
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestFromId(this.requestId);
      }
    });
  }

  loadRequestFromId(requestNo: any) {
    this.eRequestService
      .getRequestById('2-03-1-650915-00034')
      .subscribe((res) => {
        this.requestData = res;
        this.requestNo = res.requestno;
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

    /* if (this.requestSubType === SchoolRequestSubType.ชาวต่างชาติ) {
      data.passportstartdate = data.passportstartdate.split('T')[0];
      data.passportenddate = data.passportenddate.split('T')[0];
      console.log('data = ', data);

      if (data?.visainfo) {
        const visa = parseJson(data?.visainfo);
        data.visaclass = visa.visaclass;
        data.visatype = visa.visatype;
        data.visaenddate = visa.visaenddate;
      }
    } */

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
    if (!res) return;
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

  /* getSchoolAddress() {
    this.tempLicenseService
      .getSchoolInfo(this.schoolId)
      .subscribe((res: any) => {
        this.form.controls.schoolAddr.patchValue(res);
      });
  } */

  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces$ = this.addressService.getProvinces();
    this.positionTypes$ = this.staffService.getPositionTypes();
    //this.getSchoolAddress();
  }

  cancel() {
    this.router.navigate(['/temp-license']);
  }

  next() {
    this.router.navigate(['/temp-license', 'confirm']);
  }

  prevPage() {
    this.router.navigate(['/temp-license', 'list']);
  }
}
