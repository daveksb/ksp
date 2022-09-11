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
import { defaultRequestPayload, RequestType } from '@ksp/shared/interface';
import {
  AddressService,
  GeneralInfoService,
  RequestLicenseService,
  StaffService,
  TempLicenseService,
} from '@ksp/shared/service';
import {
  formatCheckboxData,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
  toLowercaseProp,
} from '@ksp/shared/utility';
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
    teachinginfo: [],
    hiringinfo: [],
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
  schoolAddressData: any = null;
  displayMode: number =
    RequestType[
      'ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวไทย)'
    ];

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
    private requestService: RequestLicenseService
  ) {}

  ngOnInit(): void {
    this.getList();
    this.checkRequestId();
    this.checkRequestType();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestFromId(this.requestId);
      }
    });
  }

  loadRequestFromId(id: number) {
    this.requestService.getRequestById(id).subscribe((res: any) => {
      console.log('result = ', res);
      this.form.controls.userInfo.patchValue(res);
      this.patchAddress(parseJson(res.addressinfo));
      this.form.controls.schoolAddr.patchValue(this.schoolAddressData);
      this.patchEdu(parseJson(res.eduinfo));

      this.patchHiringInfo(parseJson(res.teachinginfo));
      this.patchTeachingInfo(parseJson(res.teachinginfo));
    });
  }

  patchTeachingInfo(res: any) {
    console.log('teaching response= ', res);

    const t = JSON.parse(res.teachingInfo.teachingLevel);
    const teachingLevel = levels.map((level) => {
      if (t.includes(level.value)) {
        return level.value;
      } else {
        return false;
      }
    });
    const s = JSON.parse(res.teachingInfo.teachingSubjects);
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
    this.form.controls.teachinginfo.patchValue(data);
  }

  patchHiringInfo(data: any) {
    console.log('hiring = ', data);
    this.form.controls.hiringinfo.patchValue(data);
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
        console.log('req = ', res);
        res = toLowercaseProp(res);
        this.pathUserInfo(res);
        this.patchAddress(parseJson(res.addresses));
        this.form.controls.schoolAddr.patchValue(this.schoolAddressData);
        this.patchEdu(parseJson(res.educations));
        this.patchTeachingInfo(parseJson(res.teachinginfo));
        this.patchHiringInfo(parseJson(res.hiringinfo));
      });
  }

  createRequest() {
    const baseForm = this.fb.group(defaultRequestPayload);

    const formData: any = this.form.getRawValue();
    formData.addr1.addressType = 1;
    formData.addr2.addressType = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    rawUserInfo.schoolId = this.schoolId;

    const userInfo = toLowercaseProp(rawUserInfo);

    userInfo.ref1 = '2';
    userInfo.ref2 = '03';
    userInfo.ref3 = '1';
    userInfo.systemtype = '2';
    userInfo.requesttype = this.requestType;

    const teaching: any = this.form.controls.teachinginfo.value;

    const teachingLevel = formatCheckboxData(teaching.teachingLevel, levels);
    const teachingSubjects = formatCheckboxData(
      teaching.teachingSubjects,
      subjects
    );
    const teachingInfo = {
      teachingLevel,
      teachingSubjects,
      teachingSubjectOther: teaching.teachingSubjectOther || null,
    };

    //console.log('teachingInfo = ', teachingInfo);

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{
        teachinginfo: JSON.stringify({
          teachingInfo,
          ...formData.hiringinfo,
        }),
      },
    };

    baseForm.patchValue(payload);
    //console.log('current form = ', baseForm.value);
    this.requestService.requestLicense(payload).subscribe((res) => {
      //console.log('request result = ', res);
    });
  }

  pathUserInfo(data: any) {
    /*     const {
      schoolId,
      createDate,
      addresses,
      educations,
      teachinginfo,
      hiringinfo,
      ...formData
    } = data; */
    data.birthdate = data.birthdate.split('T')[0];
    this.form.controls.userInfo.patchValue(data);
  }

  tempSave() {
    // save uncomplete form, get requestNo and Id as response
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
    this.getSchoolAddress();
  }

  getSchoolAddress() {
    this.tempLicenseService
      .getSchoolInfo(this.schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.schoolAddressData = res;
      });
  }

  checkRequestType() {
    this.route.queryParams.subscribe((params) => {
      this.form.reset();
      this.requestType = Number(params['type']);
      if (params['type'] == 1) {
        this.requestTypeLabel =
          RequestType[
            RequestType[
              'ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวไทย)'
            ]
          ];
      } else if (params['type'] == 2) {
        this.requestTypeLabel =
          RequestType[
            RequestType[
              'ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ (ผู้บริหาร)'
            ]
          ];
      } else if (params['type'] == 3) {
        this.requestTypeLabel =
          RequestType[
            RequestType[
              'ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวต่างชาติ)'
            ]
          ];
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

  /*   onTabIndexChanged(tabIndex: number) {
    if (tabIndex === 2) {
      //this.patchEdu(this.staffId);
    }
  } */
}
