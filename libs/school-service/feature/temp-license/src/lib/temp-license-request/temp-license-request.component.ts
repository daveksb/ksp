import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { levels, subjects } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';
import {
  AddressService,
  GeneralInfoService,
  RequestLicenseService,
  StaffService,
  TempLicenseService,
} from '@ksp/shared/service';
import { parseJson, replaceEmptyWithNull, thaiDate } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { LicenseDetailService } from './temp-license-request.service';

@UntilDestroy()
@Component({
  templateUrl: './temp-license-request.component.html',
  styleUrls: ['./temp-license-request.component.scss'],
})
export class TempLicenseRequestComponent implements OnInit {
  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    schoolAddr: [],
    edu1: [],
    edu2: [],
    teachingInfo: [],
    hiringInfo: [],
  });

  today = thaiDate(new Date());
  countries$!: Observable<any>;
  provinces$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  staffTypes$!: Observable<any>;
  positionTypes$!: Observable<any>;
  academicTypes$!: Observable<any>;

  requestId!: number;
  icCardNo = '';
  schoolAddressLabel = `ที่อยู่ของสถานศึกษา
  ที่ขออนุญาต`;

  requestType = 1;
  requestTypeLabel = '';
  requestNo = '';
  schoolId = '0010201056';

  educationInfo: string[] = [];
  teachingInfo: string[] = [];
  reasonInfo: string[] = [];
  evidenceFiles: string[] = [];
  prefixList$!: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: LicenseDetailService,
    private tempLicenseService: TempLicenseService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private staffService: StaffService,
    private requestLicenseService: RequestLicenseService
  ) {}

  ngOnInit(): void {
    this.getList();
    this.checkRequestId();
    this.checkRequestType();
  }

  createRequest() {
    const baseForm = this.getDefaultForm();

    const formData: any = this.form.getRawValue();
    formData.addr1.addressType = 1;
    formData.addr2.addressType = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    rawUserInfo.schoolId = this.schoolId;

    const userInfo = Object.keys(rawUserInfo).reduce(
      (destination: any, key) => {
        destination[key.toLowerCase()] = rawUserInfo[key];
        return destination;
      },
      {}
    );

    userInfo.ref1 = '2';
    userInfo.ref2 = '03';
    userInfo.ref3 = '1';
    userInfo.systemtype = '2';
    userInfo.requesttype = this.requestType;

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(formData.teachingInfo) },
    };

    //console.log('payload = ', payload);

    baseForm.patchValue(payload);
    console.log('current form = ', baseForm.value);

    this.requestLicenseService.requestLicense(payload).subscribe((res) => {
      console.log('request result = ', res);
    });
  }

  searchStaffFromIdCard(idCard: string) {
    if (!idCard) return;
    const payload = {
      idcardno: idCard,
      schoolid: this.schoolId,
    };
    this.staffService
      .searchStaffFromIdCard(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.pathUserInfo(res);
        this.patchAddress(parseJson(res.addresses));
        this.patchEdu(parseJson(res.educations));
        this.pathTeachingInfo(parseJson(res.teachinginfo));
        this.pathHiringInfo(parseJson(res.hiringinfo));
      });
  }

  patchEdu(edus: any[]) {
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

  patchAddress(addrs: any[]) {
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

  pathUserInfo(data: any) {
    const {
      schoolId,
      createDate,
      addresses,
      educations,
      teachinginfo,
      hiringinfo,
      ...formData
    } = data;
    formData.birthDate = formData.birthDate.split('T')[0];
    this.form.controls.userInfo.patchValue(formData);
  }

  pathTeachingInfo(res: any) {
    const t = JSON.parse(res.teachingLevel);
    const teachingLevel = levels.map((level, i) => {
      if (t.includes(level.value)) {
        return level.value;
      } else {
        return false;
      }
    });
    const s = JSON.parse(res.teachingSubjects);
    const teachingSubjects = subjects.map((subj, i) => {
      if (s.includes(subj.value)) {
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
    this.form.controls.teachingInfo.patchValue(data);
  }

  pathHiringInfo(data: any) {
    this.form.controls.hiringInfo.patchValue(data);
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        // load request data
      }
    });
  }

  /*   onTabIndexChanged(tabIndex: number) {
    if (tabIndex === 2) {
      //this.patchEdu(this.staffId);
    }
  } */

  tempSave() {
    if (!this.requestId) {
      const formData: any = this.form.getRawValue();
      formData.userInfo.schoolId = this.schoolId;
      formData.userInfo.createDate = new Date().toISOString().split('.')[0];
      //formData.userInfo.nationality = 'TH';
      //formData.addr1.addressType = 1;
      //formData.addr2.addressType = 2;
      //console.log('formData = ', formData);
      const { id, ...userInfo } = formData.userInfo;
      const payload = {
        ...userInfo,
        ...{ addresses: JSON.stringify([formData.addr1]) },
        ...{ educations: JSON.stringify({ a: '1' }) },
        ...{ teachingInfo: JSON.stringify({ a: '1' }) },
        ...{ hiringInfo: JSON.stringify({ a: '1' }) },
      };

      console.log('payload = ', payload);
      this.staffService.addStaff2(payload).subscribe((res) => {
        console.log('add staff result = ', res);
      });
    }
  }

  save() {
    const dialogRef = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '850px',
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    this.amphurs2$ = this.amphurs1$;
    this.tumbols2$ = this.tumbols1$;

    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }

  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.educationInfo = this.service.educationInfo;
    this.teachingInfo = this.service.teachingInfo;
    this.reasonInfo = this.service.reasonInfo;
    this.evidenceFiles = this.service.evidenceFiles;
    this.provinces$ = this.addressService.getProvinces();
    this.countries$ = this.addressService.getCountry();
    this.staffTypes$ = this.staffService.getStaffTypes();
    this.positionTypes$ = this.staffService.getPositionTypes();
    this.academicTypes$ = this.staffService.getAcademicStandingTypes();
    this.tempLicenseService
      .getSchoolInfo(this.schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        //console.log('school = ', res);
        this.form.controls.schoolAddr.patchValue(res);
      });
  }

  checkRequestType() {
    this.route.queryParams.subscribe((params) => {
      this.requestType = Number(params['type']);
      //console.log('request type = ', this.requestType);
      if (params['type'] == 1) {
        this.requestTypeLabel = '(ชาวไทย)';
      } else if (params['type'] == 2) {
        this.requestTypeLabel = '(ผู้บริหารการศึกษา)';
      } else if (params['type'] == 3) {
        this.requestTypeLabel = '(ชาวต่างชาติ)';
      }
    });
  }

  backToListPage() {
    this.router.navigate(['/temp-license', 'list']);
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.onCompleted();
        }
      });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.createRequest();
        }
      });
  }

  provinceChanged(type: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (type === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (type === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(type: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (type === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (type === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  getDefaultForm() {
    return this.fb.group({
      currentprocess: null,
      requeststatus: null,
      updatedate: null,
      licenseid: null,
      staffid: null,
      systemtype: null,
      requesttype: null,
      requesteduocupy: null,
      requestfor: null,
      schoolid: null,
      idcardno: null,
      passportno: null,
      passportstartdate: null,
      passportenddate: null,
      prefixth: null,
      firstnameth: null,
      lastnameth: null,
      prefixen: null,
      firstnameen: null,
      lastnameen: null,
      sex: null,
      birthdate: null,
      email: null,
      position: null,
      educationoccupy: null,
      contactphone: null,
      workphone: null,
      nationality: null,
      country: null,
      coordinatorinfo: null,
      visainfo: null,
      userpermission: null,
      addressinfo: null,
      schooladdrinfo: null,
      eduinfo: null,
      teachinginfo: null,
      reasoninfo: null,
      fileinfo: null,
      otherreason: null,
      refperson: null,
      prohibitproperty: null,
      checkprohibitproperty: null,
      checksubresult: null,
      checkfinalresult: null,
      checkhistory: null,
      approveresult: null,
      paymentstatus: null,
      ref1: null,
      ref2: null,
      ref3: null,
    });
  }
}
