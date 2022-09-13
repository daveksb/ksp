import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  levels,
  RequestPageType,
  SchoolRequestProcess,
  SchoolRequestType,
  subjects,
} from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';
import { defaultRequestPayload } from '@ksp/shared/interface';
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
  uniqueTimestamp = ''; // use for file upload reference, gen only first time component loaded

  pageType = RequestPageType;

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
  requestType = 1;
  requestTypeLabel = '';
  requestNo = '';
  currentProcess!: string;
  processEnum = SchoolRequestProcess;

  disableTempSave = true;
  disableSave = true;

  icCardNo = '';
  schoolAddressLabel = `ที่อยู่ของสถานศึกษา
  ที่ขออนุญาต`;

  schoolId = '0010201056';
  displayMode: number =
    SchoolRequestType[
      'ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวไทย)'
    ];

  eduFiles: any[] = [];
  teachingFiles: any[] = [];
  reasonFiles: any[] = [];
  attachFiles: any[] = [];
  prefixList$!: Observable<any>;

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
    this.uniqueTimestamp = `${new Date().getTime()}`;
    this.getList();
    this.checkRequestId();
    this.checkRequestType();
    this.checkButtonsDisableStatus();
  }

  checkButtonsDisableStatus() {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      console.log('userInfo valid = ', this.form.controls.userInfo.valid);
      console.log('edu 1 valid = ', this.form.controls.edu1.valid);
      console.log('form valid = ', this.form.valid);

      // formValid + สถานะเป็นส่งใบคำขอ, บันทึกชั่วคราวไม่ได้ ส่งใบคำขอไม่ได้
      if (
        this.form.valid &&
        this.currentProcess === SchoolRequestProcess.created
      ) {
        this.disableTempSave = true;
        this.disableSave = true;
      }

      // formValid + สถานะเป็นบันทึกชั่วคราว, บันทึกชั่วคราวได้ ส่งใบคำขอได้
      if (this.form.valid && SchoolRequestProcess.creating) {
        this.disableTempSave = false;
        this.disableSave = false;
      }

      // formValid + ไม่มีหมายเลขใบคำขอ ทำได้ทุกอย่าง
      if (this.form.valid && !this.requestId) {
        this.disableTempSave = false;
        this.disableSave = false;
      }
      // มีหมายเลขใบคำขอแล้ว แสดงปุ่มยกเลิก
    });
  }

  updateRequest(type: string) {
    const baseForm = this.fb.group(defaultRequestPayload);
    const formData: any = this.form.getRawValue();
    formData.addr1.addresstype = 1;
    formData.addr2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    rawUserInfo.schoolId = this.schoolId;

    const userInfo = toLowercaseProp(rawUserInfo);

    if (type === 'tempSave') {
      userInfo.currentprocess = `${SchoolRequestProcess.creating}`;
    } else if (type === 'realSave') {
      console.log('real save = ');
      userInfo.currentprocess = `${SchoolRequestProcess.created}`;
    }

    userInfo.ref1 = '2';
    userInfo.ref2 = '03';
    userInfo.ref3 = '1';
    userInfo.systemtype = '2';
    userInfo.requesttype = `${this.requestType}`;

    const teaching: any = this.form.controls.teachinginfo.value;
    let teachingInfo = {};

    if (this.form.controls.teachinginfo.value) {
      const teachingLevel = formatCheckboxData(teaching.teachingLevel, levels);
      const teachingSubjects = formatCheckboxData(
        teaching.teachingSubjects,
        subjects
      );
      teachingInfo = {
        teachingLevel,
        teachingSubjects,
        teachingSubjectOther: teaching.teachingSubjectOther || null,
      };
    }

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringinfo) },
    };

    console.log('payload = ', payload);

    baseForm.patchValue(payload);
    console.log('current form = ', baseForm.value);
    this.requestService.requestLicense(baseForm.value).subscribe((res) => {
      console.log('request result = ', res);
      this.backToListPage();
    });
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
      this.requestNo = res.requestno;
      this.currentProcess = res.currentprocess;

      this.pathUserInfo(res);
      this.patchAddress(parseJson(res.addressinfo));
      this.patchEdu(parseJson(res.eduinfo));
      this.patchHiringInfo(parseJson(res.hiringinfo));
      this.patchTeachingInfo(parseJson(res.teachinginfo));
    });
  }

  patchTeachingInfo(res: any) {
    //console.log('teaching response= ', res);
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

  loadFile() {
    const payload = {
      id: `${134}`,
    };
    this.requestService.loadFile(payload).subscribe((res) => {
      console.log('file = ', res);
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
        //console.log('req = ', res);
        this.pathUserInfo(res);
        this.patchAddress(parseJson(res.addresses));
        this.patchEdu(parseJson(res.educations));
        this.patchTeachingInfo(parseJson(res.teachinginfo));
        this.patchHiringInfo(parseJson(res.hiringinfo));
      });
  }

  createRequest(type: string) {
    const baseForm = this.fb.group(defaultRequestPayload);
    const formData: any = this.form.getRawValue();
    formData.addr1.addresstype = 1;
    formData.addr2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    rawUserInfo.schoolId = this.schoolId;

    const userInfo = toLowercaseProp(rawUserInfo);

    if (type === 'tempSave') {
      //userInfo.currentprocess = `${RequestProcess.บันทึกชั่วคราว}`;
    } else if (type === 'realSave') {
      console.log('real save = ');
      //userInfo.currentprocess = `${RequestProcess.ยื่นใบคำขอ}`;
    }

    userInfo.ref1 = '2';
    userInfo.ref2 = '03';
    userInfo.ref3 = '1';
    userInfo.systemtype = '2';
    userInfo.requesttype = `${this.requestType}`;

    const teaching: any = this.form.controls.teachinginfo.value;
    let teachingInfo = {};

    if (this.form.controls.teachinginfo.value) {
      const teachingLevel = formatCheckboxData(teaching.teachingLevel, levels);
      const teachingSubjects = formatCheckboxData(
        teaching.teachingSubjects,
        subjects
      );
      teachingInfo = {
        teachingLevel,
        teachingSubjects,
        teachingSubjectOther: teaching.teachingSubjectOther || null,
      };
    }

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringinfo) },
    };

    console.log('payload = ', payload);

    baseForm.patchValue(payload);
    console.log('current form = ', baseForm.value);
    this.requestService.requestLicense(baseForm.value).subscribe((res) => {
      console.log('request result = ', res);
      this.backToListPage();
    });
  }

  pathUserInfo(data: any) {
    data.birthdate = data.birthdate.split('T')[0];
    this.form.controls.userInfo.patchValue(data);
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
    this.eduFiles = this.service.educationInfo;
    this.teachingFiles = this.service.teachingInfo;
    this.reasonFiles = this.service.reasonInfo;
    this.attachFiles = this.service.evidenceFiles;
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
        this.form.controls.schoolAddr.patchValue(res);
      });
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

  checkRequestType() {
    this.route.queryParams.subscribe((params) => {
      this.form.reset();
      this.requestType = Number(params['type']);
      if (params['type'] == 1) {
        this.requestTypeLabel =
          SchoolRequestType[
            SchoolRequestType[
              'ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวไทย)'
            ]
          ];
      } else if (params['type'] == 2) {
        this.requestTypeLabel =
          SchoolRequestType[
            SchoolRequestType[
              'ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ (ผู้บริหาร)'
            ]
          ];
      } else if (params['type'] == 3) {
        this.requestTypeLabel =
          SchoolRequestType[
            SchoolRequestType[
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
          this.createRequest('realSave');
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
