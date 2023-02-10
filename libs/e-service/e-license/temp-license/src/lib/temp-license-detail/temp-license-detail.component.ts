import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  levels,
  RequestAttachFiles,
  RequestEduFiles,
  RequestPageType,
  RequestReasonFiles,
  RequestTeachingFiles,
  SchoolRequestSubType,
  subjects,
  UserInfoFormType,
} from '@ksp/shared/constant';

import {
  AddressService,
  ERequestService,
  GeneralInfoService,
  StaffService,
} from '@ksp/shared/service';
import { checkProcess, getCookie, parseJson } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import localForage from 'localforage';
import {
  Amphur,
  Country,
  FileGroup,
  KspCheckResult,
  KspRequest,
  Nationality,
  PositionType,
  Prefix,
  Province,
  Tambol,
  VisaClass,
  VisaType,
} from '@ksp/shared/interface';
import { TempLicenseDetailService } from './temp-license-detail.service';
import { ESelfFormBaseComponent } from '@ksp/shared/form/others';
import { Location } from '@angular/common';

export class KspApprovePersistData {
  checkDetail: any = null;
  requestData: KspRequest = new KspRequest();
}
@UntilDestroy()
@Component({
  selector: 'e-service-temp-license-detail',
  templateUrl: './temp-license-detail.component.html',
  styleUrls: ['./temp-license-detail.component.scss'],
})
export class ETempLicenseDetailComponent implements OnInit {
  checkProcess = checkProcess;
  verifyChoice: any[] = [];
  selectedTabIndex = 0;
  eduFiles: FileGroup[] = RequestEduFiles;
  teachingFiles: FileGroup[] = RequestTeachingFiles;
  reasonFiles: FileGroup[] = RequestReasonFiles;
  attachFiles: FileGroup[] = RequestAttachFiles;
  amphurs1$!: Observable<Amphur[]>;
  tumbols1$!: Observable<Tambol[]>;
  amphurs2$!: Observable<Amphur[]>;
  tumbols2$!: Observable<Tambol[]>;
  provinces$!: Observable<Province[]>;
  prefixList$!: Observable<Prefix[]>;
  positionTypes$!: Observable<PositionType[]>;
  countries$!: Observable<Country[]>;
  nationList$!: Observable<Nationality[]>;
  visaTypeList!: Observable<VisaType[]>;
  visaClassList!: Observable<VisaClass[]>;
  requestId!: number;
  requestData = new KspRequest();
  userInfoFormType: number = UserInfoFormType.thai; // control the display field of user info form
  pageType = RequestPageType;
  forbidden: any;
  careerType = SchoolRequestSubType.ครู;
  requestLabel = '';
  subRequestLabel = '';
  eduSelected = true;
  btnNextPrev = {
    index: 0,
  };

  showCheckerForm = false;
  userPermission = getCookie('permissionRight');

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    schoolAddr: [],
    edu1: [],
    edu2: [],
    edu3: [],
    edu4: [],
    edu5: [],
    edu6: [],
    teachinginfo: [],
    hiringinfo: [],
    reasoninfo: [],
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
    private staffService: StaffService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.verifyChoice = this.service.verifyChoice;
    this.getList();
    this.checkRequestId();
    this.addCheckResultArray();
    this.checkSubType();
  }

  addCheckResultArray() {
    for (let i = 0; i < 7; i++) {
      this.checkResultFormArray.push(this.fb.control(null));
    }
    this.checkResultFormArray.setValidators(
      ESelfFormBaseComponent.allFilledValidator()
    );
  }

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  // save data to indexed db
  persistData() {
    //console.log('check sub result = ', checkSubResult);
    const edufiles = this.mappingCheckResultAttachment(this.eduFiles);
    const teachingfiles = this.mappingCheckResultAttachment(this.teachingFiles);
    const reasonfiles = this.mappingCheckResultAttachment(this.reasonFiles);
    const attachfiles = this.mappingCheckResultAttachment(this.attachFiles);
    const saveData: KspApprovePersistData = {
      checkDetail: {
        ...this.form.controls.checkResult.value,
        edufiles,
        teachingfiles,
        reasonfiles,
        attachfiles,
      },
      requestData: this.requestData,
    };
    //console.log('saveData = ', saveData);
    localForage.setItem('checkRequestData', saveData);
  }

  mappingCheckResultAttachment(groups: FileGroup[]): KspCheckResult[][] {
    return groups.map((group) => group.checkresult || []);
  }

  checkRequestId() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestFromId(this.requestId);
      }
    });
  }

  checkSubType() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (Number(params['subtype'])) {
        this.careerType = Number(params['subtype']);
      }

      if (this.careerType === 1) {
        this.userInfoFormType = UserInfoFormType.thai;
        this.requestLabel = 'ชาวไทย';
        this.subRequestLabel = 'ครู';
      } else if (this.careerType === 2) {
        this.userInfoFormType = UserInfoFormType.thai;
        this.requestLabel = 'ชาวไทย';
        this.subRequestLabel = 'ผู้บริหารสถานศึกษา';
      } else if (this.careerType === 5) {
        this.userInfoFormType = UserInfoFormType.foreign;
        this.requestLabel = 'ชาวต่างชาติ';
        this.subRequestLabel = 'ครูชาวต่างชาติ';
      }
    });
  }

  loadRequestFromId(requestId: number) {
    this.eRequestService.getKspRequestById(requestId).subscribe((res) => {
      if ('returncode' in res) return;
      this.requestData = res;
      this.pathUserInfo(res);
      this.patchAddress(parseJson(res.addressinfo));
      this.patchEdu(parseJson(res.eduinfo));
      this.patchHiringInfo(parseJson(res.hiringinfo));
      this.patchTeachingInfo(parseJson(res.teachinginfo));
      this.patchReasonInfo(parseJson(res.reasoninfo));
      this.patchSchoolAddrress(parseJson(res.schooladdrinfo));
      this.patchFileInfo(parseJson(res.fileinfo));
      this.patchProhibitProperty(parseJson(res.prohibitproperty));
      //console.log('res = ', res.prohibitproperty);
      this.setShowCheckerForm(res);
    });
  }

  setShowCheckerForm(res: KspRequest) {
    if (
      this.userPermission === '2' && // เจ้าหน้าที่ส่วนภูมิภาค
      ((res.process === '2' && res.status === '1') || //สร้างและส่งแบบคำขอ กำลังดำเนินการ
        (res.process === '4' && res.status === '2')) //ตรวจสอบเอกสาร ลำดับที่ 2 ขอปรับแก้ไข/เพิ่มเติม
    ) {
      this.showCheckerForm = true;
      return;
    }

    if (
      this.userPermission === '1' && // เจ้าหน้าที่ส่วนกลาง
      ((res.process === '2' && res.status === '1') || //สร้างและส่งแบบคำขอ กำลังดำเนินการ
        //(res.process === '3' && res.status === '2') || //ตรวจสอบเอกสาร ลำดับที่ 1 ปรับแก้ไข/เพิ่มเติม
        (res.process === '3' && res.status === '3')) //ตรวจสอบเอกสาร ลำดับที่ 1 ผ่านการตรวจสอบ
      //(res.process === '4' && res.status === '2') || //ตรวจสอบเอกสาร ลำดับที่ 2 ปรับแก้ไข/เพิ่มเติม
    ) {
      this.showCheckerForm = true;
    }
  }

  patchFileInfo(res: any) {
    if (res && res.tab3 && Array.isArray(res.tab3)) {
      this.eduFiles.forEach((group, index) => (group.files = res.tab3[index]));
    }
    if (res && res.tab4 && Array.isArray(res.tab4)) {
      this.teachingFiles.forEach(
        (group, index) => (group.files = res.tab4[index])
      );
    }

    if (res && res.tab5 && Array.isArray(res.tab5)) {
      this.reasonFiles.forEach(
        (group, index) => (group.files = res.tab5[index])
      );
    }
    if (res && res.tab6 && Array.isArray(res.tab6)) {
      this.attachFiles.forEach(
        (group, index) => (group.files = res.tab6[index])
      );
    }
    //console.log('attach files = ', this.attachFiles);
  }
  patchProhibitProperty(res: any) {
    this.forbidden = res;
  }
  patchReasonInfo(res: any) {
    this.form.controls.reasoninfo.patchValue(res);
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
        if (i === 2) {
          this.form.controls.edu3.patchValue(edu);
        }
        if (i === 3) {
          this.form.controls.edu4.patchValue(edu);
        }
        if (i === 4) {
          this.form.controls.edu5.patchValue(edu);
        }
        if (i === 5) {
          this.form.controls.edu6.patchValue(edu);
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
    this.countries$ = this.addressService.getCountry();
    this.nationList$ = this.generalInfoService.getNationality();
    this.visaClassList = this.generalInfoService.getVisaClass();
    this.visaTypeList = this.generalInfoService.getVisaType();
  }

  cancel() {
    this.router.navigate(['/temp-license']);
  }

  nextTab() {
    if (this.selectedTabIndex < 6) {
      this.selectedTabIndex++;
    } else {
      this.nextPage();
    }
  }

  prevTab() {
    if (this.selectedTabIndex == 0) {
      this.prevPage();
    } else {
      this.selectedTabIndex--;
    }
  }

  prevPage() {
    //this.router.navigate(['/temp-license', 'list']);
    this.location.back();
  }

  nextPage() {
    if (this.checkResultFormArray.valid) {
      this.persistData();
      this.router.navigate(['/temp-license', 'confirm', this.requestId]);
    }
  }
}
