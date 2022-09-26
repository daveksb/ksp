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
  SchoolRequestSubType,
  subjects,
  UserInfoFormType,
} from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';
import { SchoolRequest } from '@ksp/shared/interface';

import {
  AddressService,
  GeneralInfoService,
  RequestService,
  SchoolInfoService,
  StaffService,
} from '@ksp/shared/service';
import {
  formatCheckboxData,
  formatDate,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import uniqueString from 'unique-string';

@UntilDestroy()
@Component({
  templateUrl: './school-request.component.html',
  styleUrls: ['./school-request.component.scss'],
})
export class SchoolRequestComponent implements OnInit {
  uniqueTimestamp!: string; // use for file upload reference, gen only first time component loaded

  pageType = RequestPageType;

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
  requestData!: SchoolRequest;
  requestDate: string = thaiDate(new Date());

  systemType = '2'; // school service
  requestType = '3';
  requestSubType = SchoolRequestSubType.ครู; // 1 ไทย 2 ผู้บริหาร 3 ต่างชาติ
  requestLabel = 'ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ';
  requestNo: string | null = '';
  currentProcess!: number;

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
  option = this.fb.control(false);
  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    schoolAddr: [],
    edu1: [],
    edu2: [],
    teachinginfo: [],
    hiringinfo: [],
    reasoninfo: [],
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
    private requestService: RequestService
  ) {}
  get Option$() {
    return this.option.valueChanges;
  }
  ngOnInit(): void {
    this.uniqueTimestamp = uniqueString();
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
      requeststatus: '0',
    };

    this.requestService.cancelRequest(payload).subscribe((res) => {
      //console.log('Cancel request  = ', res);
    });
  }

  createRequest(type: string) {
    //console.log('create request = ');
    const baseForm = this.fb.group(new SchoolRequest());
    const formData: any = this.form.getRawValue();
    const tab3 = this.mapFileInfo(this.eduFiles);
    const tab4 = this.mapFileInfo(this.teachingFiles);
    const tab5 = this.mapFileInfo(this.reasonFiles);
    const tab6 = this.mapFileInfo(this.attachFiles);
    formData.addr1.addresstype = 1;
    formData.addr2.addresstype = 2;

    const { id, ...userInfo } = formData.userInfo;
    userInfo.schoolid = this.schoolId;
    userInfo.currentprocess = `1`;
    userInfo.requeststatus = `1`;
    // if (this.requestId) {
    //   userInfo.currentprocess = `1`;
    // } else {
    //   userInfo.currentprocess = `2`;
    // }

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

    //console.log('form data = ', formData);

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringinfo) },
      ...{ visainfo: JSON.stringify(visaInfo) },
      ...{ schooladdrinfo: JSON.stringify(formData.schoolAddr) },
      ...{ reasoninfo: JSON.stringify(formData.reasoninfo) },
      ...{ fileinfo: JSON.stringify({ tab3, tab4, tab5, tab6 }) },
    };

    if (type == 'submit') {
      payload.currentprocess = `2`;
    } else {
      payload.currentprocess = `1`;
    }
    //console.log('payload = ', payload);

    baseForm.patchValue(payload);
    //console.log('current form = ', baseForm.value);
    this.requestService.createRequest(baseForm.value).subscribe((res) => {
      this.backToListPage();
    });
  }

  updateRequest(type: string) {
    const baseForm = this.fb.group(new SchoolRequest());
    const formData: any = this.form.getRawValue();
    const userInfo = formData.userInfo;
    userInfo.currentprocess = `1`;
    userInfo.requeststatus = `1`;
    userInfo.systemtype = `${this.systemType}`;
    userInfo.requesttype = `${this.requestType}`;
    userInfo.subtype = `${this.requestSubType}`;

    if (this.requestSubType === SchoolRequestSubType.อื่นๆ) {
      userInfo.passportenddate = formatDate(userInfo.passportenddate);
      userInfo.passportstartdate = formatDate(userInfo.passportstartdate);
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

    const tab3 = this.mapFileInfo(this.eduFiles);
    const tab4 = this.mapFileInfo(this.teachingFiles);
    const tab5 = this.mapFileInfo(this.reasonFiles);
    const tab6 = this.mapFileInfo(this.attachFiles);

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringinfo) },
      ...{ visainfo: JSON.stringify(visaInfo) },
      ...{ schooladdrinfo: JSON.stringify(formData.schoolAddr) },
      ...{ reasoninfo: JSON.stringify(formData.reasoninfo) },
      ...{ fileinfo: JSON.stringify({ tab3, tab4, tab5, tab6 }) },
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
      res.currentprocess = `2`;
      res.requeststatus = '1';
    } else {
      res.currentprocess = `1`;
      res.requeststatus = '1';
    }

    //console.log('update payload = ', res);
    this.requestService.updateRequest(res).subscribe((res) => {
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

  checkButtonsDisableStatus() {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //console.log('userInfo valid = ', this.form.controls.userInfo.valid);
      //console.log('form valid = ', this.form.valid);

      // formValid + ไม่มีหมายเลขใบคำขอ ทำได้ทุกอย่าง
      if (this.form.valid && !this.requestId) {
        this.disableTempSave = false;
        this.disableSave = false;
      }

      // formValid + สถานะเป็นสร้างใบคำขอ, บันทึกชั่วคราวได้ ส่งใบคำขอได้
      else if (this.form.valid && this.currentProcess === 1) {
        this.disableTempSave = false;
        this.disableSave = false;
      }

      // formValid + สถานะเป็นสร้างและส่งใบคำขอ, บันทึกชั่วคราวไม่ได้ ส่งใบคำขอไม่ได้
      else if (this.form.valid && this.currentProcess === 2) {
        this.disableTempSave = true;
        this.disableSave = true;
      }
      // form invalid
      else {
        this.disableTempSave = true;
        this.disableSave = true;
      }

      // มีหมายเลขใบคำขอแล้ว enable ปุ่มยกเลิก
      if (this.requestId) {
        if (this.currentProcess === 0) {
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
    this.requestService.getRequestById(id).subscribe((res) => {
      this.requestData = res;
      this.requestDate = thaiDate(new Date(`${res.requestdate}`));
      this.requestNo = res.requestno;
      this.currentProcess = Number(res.currentprocess);
      //console.log('current process = ', this.currentProcess);
      this.pathUserInfo(res);
      this.patchAddress(parseJson(res.addressinfo));
      this.patchEdu(parseJson(res.eduinfo));
      this.patchHiringInfo(parseJson(res.hiringinfo));
      this.patchTeachingInfo(parseJson(res.teachinginfo));
      this.patchReasonInfo(parseJson(res.reasoninfo));
      this.patchFileInfo(parseJson(res.fileinfo));
    });
  }

  patchTeachingInfo(res: any) {
    //console.log('teaching response= ', res);
    //if (!res.teachingLevel) return;
    const teachingLevel = levels.map((level) => {
      if (res.teachingLevel?.includes(level.value)) {
        return level.value;
      } else {
        return false;
      }
    });

    const teachingSubjects = subjects.map((subj) => {
      if (res.teachingSubjects?.includes(subj.value)) {
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

  patchReasonInfo(res: any) {
    this.form.controls.reasoninfo.patchValue(res);
  }
  patchFileInfo(res: any) {
    this.patchFileId(this.eduFiles, res.tab3);
    this.patchFileId(this.teachingFiles, res.tab4);
    this.patchFileId(this.reasonFiles, res.tab5);
    this.patchFileId(this.attachFiles, res.tab6);
  }
  patchFileId(fileList: any, tab: any) {
    for (let i = 0; i < fileList.length; i++) {
      fileList[i].fileId = tab[i]?.fileid;
      fileList[i].fileName = tab[i]?.filename;
    }
    return fileList;
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
    data.birthdate = data?.birthdate?.split('T')[0];

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
    this.eduFiles = structuredClone(RequestEduFiles);
    this.teachingFiles = structuredClone(RequestTeachingFiles);
    this.reasonFiles = structuredClone(RequestReasonFiles);
    this.attachFiles = structuredClone(RequestAttachFiles);

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

    dialogRef.componentInstance.confirmed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
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

  mapFileInfo(fileList: any[]) {
    return fileList.map((file: any) => {
      const object = {
        fileid: file.fileId || null,
        filename: file.fileName || null,
      };
      return object;
    });
  }
}
