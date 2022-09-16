import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  levels,
  RequestAttachFiles,
  RequestEduFiles,
  RequestPageType,
  RequestReasonFiles,
  RequestTeachingFiles,
  SchoolRequestProcess,
  SchoolRequestSubType,
  subjects,
  UserInfoFormType,
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
  SchoolInfoService,
  StaffService,
} from '@ksp/shared/service';
import {
  formatCheckboxData,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  templateUrl: './school-request.component.html',
  styleUrls: ['./school-request.component.scss'],
})
export class SchoolRequestComponent implements OnInit {
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
  nationList$!: Observable<any>;
  visaTypeList!: Observable<any>;
  visaClassList!: Observable<any>;

  requestId!: number;
  requestData: any;

  systemType = '2'; // school service
  requestType = '03';
  requestSubType = SchoolRequestSubType.ครู; // 1 ไทย 2 ผู้บริหาร 3 ต่างชาติ
  requestLabel = 'ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ';
  requestNo = '';
  currentProcess!: number;
  processEnum = SchoolRequestProcess;

  disableTempSave = true;
  disableSave = true;
  disableCancel = true;

  icCardNo = '';
  schoolAddressLabel = `ที่อยู่ของสถานศึกษา
  ที่ขออนุญาต`;

  schoolId = '0010201056';
  userInfoFormType: number = UserInfoFormType.thai; // control the display field of user info form

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
    private schoolInfoService: SchoolInfoService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private staffService: StaffService,
    private requestService: RequestLicenseService
  ) {}

  ngOnInit(): void {
    this.uniqueTimestamp = `${new Date().getTime()}`;
    this.getList();
    this.checkRequestId();
    this.checkRequestSubType();
    this.checkButtonsDisableStatus();
  }

  checkRequestSubType() {
    this.route.queryParams.subscribe((params) => {
      this.form.reset();
      if (Number(params['subtype'])) {
        this.requestSubType = Number(params['subtype']);
      }

      if (this.requestSubType === SchoolRequestSubType.อื่นๆ) {
        this.userInfoFormType = UserInfoFormType.foreign;
      } else {
        this.userInfoFormType = UserInfoFormType.thai;
      }

      if (this.requestSubType == SchoolRequestSubType.ครู) {
        this.requestLabel += SchoolRequestSubType[SchoolRequestSubType.ครู];
      } else if (
        this.requestSubType == SchoolRequestSubType.ผู้บริหารสถานศึกษา
      ) {
        this.requestLabel +=
          SchoolRequestSubType[SchoolRequestSubType.ผู้บริหารสถานศึกษา];
      } else if (this.requestSubType == SchoolRequestSubType.อื่นๆ) {
        this.requestLabel += SchoolRequestSubType[SchoolRequestSubType.อื่นๆ];
      }
    });
  }

  submitRequest() {
    // ถ้ามี request id เปลี่ยนสถานะ
    // ถ้ายังไม่มี request id insert new row
    if (this.requestId) {
      this.updateRequest('submit');
    } else {
      this.createRequest('submit');
    }
  }

  tempSave() {
    if (this.requestId) {
      this.updateRequest('temp');
    } else {
      this.createRequest('temp');
    }
  }

  cancelRequest() {
    const payload = {
      id: `${this.requestId}`,
      currentprocess: `${SchoolRequestProcess.ยกเลิก}`,
    };
    this.requestService.changeRequestProcess(payload).subscribe((res) => {
      //console.log('Cancel request  = ', res);
    });
  }

  updateRequest(type: string) {
    const baseForm = this.fb.group(defaultRequestPayload);
    const formData: any = this.form.getRawValue();

    const userInfo = formData.userInfo;
    userInfo.currentprocess = `${SchoolRequestProcess.กำลังสร้าง}`;
    userInfo.systemtype = `${this.systemType}`;
    userInfo.requesttype = `${this.requestType}`;
    userInfo.subtype = `${this.requestSubType}`;

    if (this.requestSubType === SchoolRequestSubType.อื่นๆ) {
      userInfo.passportenddate = userInfo.passportenddate.split('T')[0];
      userInfo.passportstartdate = userInfo.passportstartdate.split('T')[0];
    }

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

    const visaInfo = {
      visaclass: userInfo.visaclass,
      visatype: userInfo.visatype,
      visaenddate: userInfo.visaenddate,
    };

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringinfo) },
      ...{ visainfo: JSON.stringify(visaInfo) },
    };

    baseForm.patchValue(payload);

    const {
      ref1,
      ref2,
      ref3,
      uniquetimestamp,
      requestdate,
      updatedate,
      requestno,
      ...temp
    } = baseForm.value;

    const res = replaceEmptyWithNull(temp);

    res.id = `${this.requestId}`;
    res.schoolid = this.schoolId;
    if (type === 'submit') {
      res.currentprocess = `${SchoolRequestProcess.ยื่นใบคำขอ}`;
    } else {
      res.currentprocess = `${SchoolRequestProcess.กำลังสร้าง}`;
    }

    console.log('update payload = ', res);
    this.requestService.updateRequest(res).subscribe((res) => {
      //console.log('update result = ', res);
      this.backToListPage();
    });
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

  createRequest(type: string) {
    //console.log('create request = ');
    const baseForm = this.fb.group(defaultRequestPayload);
    const formData: any = this.form.getRawValue();
    formData.addr1.addresstype = 1;
    formData.addr2.addresstype = 2;

    const { id, ...userInfo } = formData.userInfo;
    userInfo.schoolid = this.schoolId;

    if (this.requestId) {
      userInfo.currentprocess = `${SchoolRequestProcess.กำลังสร้าง}`;
    } else {
      userInfo.currentprocess = `${SchoolRequestProcess.ยื่นใบคำขอ}`;
    }

    userInfo.ref1 = `${this.systemType}`;
    userInfo.ref2 = '03';
    userInfo.ref3 = '1';

    userInfo.systemtype = `${this.systemType}`;
    userInfo.requesttype = `${this.requestType}`;
    userInfo.subtype = `${this.requestSubType}`;

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

    const visaInfo = {
      visaclass: userInfo.visaclass,
      visatype: userInfo.visatype,
      visaenddate: userInfo.visaenddate,
    };

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringinfo) },
      ...{ visainfo: JSON.stringify(visaInfo) },
    };

    if (type == 'submit') {
      payload.currentprocess = `${SchoolRequestProcess.ยื่นใบคำขอ}`;
    } else {
      payload.currentprocess = `${SchoolRequestProcess.กำลังสร้าง}`;
    }
    //console.log('payload = ', payload);

    baseForm.patchValue(payload);
    //console.log('current form = ', baseForm.value);
    this.requestService.requestLicense(baseForm.value).subscribe((res) => {
      //console.log('request result = ', res);
      this.backToListPage();
    });
  }

  checkButtonsDisableStatus() {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //console.log('userInfo valid = ', this.form.controls.userInfo.valid);
      //console.log('form valid = ', this.form.valid);

      // formValid + สถานะเป็นยื่นใบคำขอ, บันทึกชั่วคราวไม่ได้ ส่งใบคำขอไม่ได้
      if (
        this.form.valid &&
        this.currentProcess === SchoolRequestProcess.ยื่นใบคำขอ
      ) {
        this.disableTempSave = true;
        this.disableSave = true;
      }

      // formValid + สถานะเป็นบันทึกชั่วคราว, บันทึกชั่วคราวได้ ส่งใบคำขอได้
      if (
        this.form.valid &&
        this.currentProcess === SchoolRequestProcess.กำลังสร้าง
      ) {
        this.disableTempSave = false;
        this.disableSave = false;
      }

      // formValid + ไม่มีหมายเลขใบคำขอ ทำได้ทุกอย่าง
      if (this.form.valid && !this.requestId) {
        this.disableTempSave = false;
        this.disableSave = false;
      }

      // มีหมายเลขใบคำขอแล้ว enable ปุ่มยกเลิก
      if (this.requestId) {
        if (this.currentProcess === SchoolRequestProcess.ยกเลิก) {
          this.disableCancel = true;
        } else {
          this.disableCancel = false;
        }
      }
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
      this.requestData = res;
      this.requestNo = res.requestno;
      this.currentProcess = +res.currentprocess;
      //console.log('current process = ', this.currentProcess);

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

  pathUserInfo(data: any) {
    data.birthdate = data.birthdate.split('T')[0];

    if (this.requestSubType === SchoolRequestSubType.อื่นๆ) {
      data.passportstartdate = data.passportstartdate.split('T')[0];
      data.passportenddate = data.passportenddate.split('T')[0];
      //console.log('data = ', data);

      if (data?.visainfo) {
        const visa = parseJson(data?.visainfo);
        data.visaclass = visa.visaclass;
        data.visatype = visa.visatype;
        data.visaenddate = visa.visaenddate;
      }
    }

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
    this.eduFiles = RequestEduFiles;
    this.teachingFiles = RequestTeachingFiles;
    this.reasonFiles = RequestReasonFiles;
    this.attachFiles = RequestAttachFiles;

    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces$ = this.addressService.getProvinces();
    this.countries$ = this.addressService.getCountry();
    this.nationList$ = this.generalInfoService.getNationality();
    this.visaClassList = this.generalInfoService.getVisaClass();
    this.visaTypeList = this.generalInfoService.getVisaType();

    this.staffTypes$ = this.staffService.getStaffTypes();
    this.positionTypes$ = this.staffService.getPositionTypes();
    this.academicTypes$ = this.staffService.getAcademicStandingTypes();
    this.getSchoolAddress();
  }

  getSchoolAddress() {
    this.schoolInfoService
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

  backToListPage() {
    this.router.navigate(['/temp-license', 'list']);
  }

  onCancelRequest() {
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
          this.createRequest('submit');
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