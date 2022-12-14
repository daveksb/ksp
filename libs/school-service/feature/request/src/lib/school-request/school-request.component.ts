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
import {
  AcademicStanding,
  Amphur,
  Country,
  FileGroup,
  KspRequest,
  KspRequestProcess,
  Nationality,
  PositionType,
  Prefix,
  Province,
  SchInfo,
  SchRequestSearchFilter,
  SchStaff,
  StaffType,
  Tambol,
  VisaClass,
  VisaType,
} from '@ksp/shared/interface';

import {
  AddressService,
  GeneralInfoService,
  LoaderService,
  SchoolInfoService,
  SchoolRequestService,
  StaffService,
} from '@ksp/shared/service';
import {
  formatCheckboxData,
  formatDatePayload,
  formatRequestNo,
  getCookie,
  mapMultiFileInfo,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { forkJoin, Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  templateUrl: './school-request.component.html',
  styleUrls: ['./school-request.component.scss'],
})
export class SchoolRequestComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  uniqueNo!: string; // use for file upload reference, gen only first time component loaded
  pageType = RequestPageType;
  countries$!: Observable<Country[]>;
  nationList$!: Observable<Nationality[]>;
  visaTypeList!: Observable<VisaType[]>;
  visaClassList!: Observable<VisaClass[]>;
  provinces$!: Observable<Province[]>;
  amphurs1$!: Observable<Amphur[]>;
  tumbols1$!: Observable<Tambol[]>;
  amphurs2$!: Observable<Amphur[]>;
  tumbols2$!: Observable<Tambol[]>;
  staffTypes$!: Observable<StaffType[]>;
  positionTypes$!: Observable<PositionType[]>;
  academicTypes$!: Observable<AcademicStanding[]>;
  prefixList$!: Observable<Prefix[]>;
  requestId!: number;
  requestData = new KspRequest();
  staffData = new SchStaff();
  careerType = SchoolRequestSubType.ครู; // 1 ไทย 2 ผู้บริหาร 3 ต่างชาติ
  requestLabel = '';
  disableTempSave = true;
  disableSave = false;
  disableCancel = true;
  schoolId = getCookie('schoolId');
  userId = getCookie('userId');
  userInfoFormType: number = UserInfoFormType.thai; // control the display field of user info form
  eduFiles: FileGroup[] = [];
  teachingFiles: FileGroup[] = [];
  reasonFiles: FileGroup[] = [];
  attachFiles: FileGroup[] = [];
  eduSelected: number[] = [];
  forbidden: any = null;
  schoolInfo!: SchInfo;

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
    private requestService: SchoolRequestService,
    private loaderService: LoaderService
  ) {}

  eduSelect(degreeLevel: number, evt: any) {
    const checked = evt.target.checked;
    this.eduSelected[degreeLevel] = checked;
  }

  ngOnInit(): void {
    this.uniqueNo = uuidv4();
    this.getList();
    this.checkRequestId();
    this.checkCareerType();
    this.checkButtonsDisableStatus();
  }

  duplicateRequestDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `หมายเลขบัตรประชาชนนี้ได้ถูกใช้ยื่นใบคำขอ
        และกำลังอยู่ในระหว่างดำเนินการ !`,
      },
    });
    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.backToListPage();
      }
    });
  }

  checkCareerType() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      this.form.reset();
      if (Number(params['subtype'])) {
        this.careerType = Number(params['subtype']);
      }

      if (this.careerType === SchoolRequestSubType.ชาวต่างชาติ) {
        this.userInfoFormType = UserInfoFormType.foreign;
      } else {
        this.userInfoFormType = UserInfoFormType.thai;
      }

      if (this.careerType == SchoolRequestSubType.ครู) {
        this.requestLabel = SchoolRequestSubType[SchoolRequestSubType.ครู];
      } else if (this.careerType == SchoolRequestSubType.ผู้บริหารสถานศึกษา) {
        this.requestLabel =
          SchoolRequestSubType[SchoolRequestSubType.ผู้บริหารสถานศึกษา];
      } else if (this.careerType == SchoolRequestSubType.ชาวต่างชาติ) {
        this.requestLabel =
          SchoolRequestSubType[SchoolRequestSubType.ชาวต่างชาติ];
      }
    });
  }

  cancelRequest() {
    const payload: KspRequestProcess = {
      requestid: `${this.requestId}`,
      process: this.requestData.process,
      status: '0',
      detail: null,
      userid: this.userId,
      paymentstatus: null,
    };
    const updateRequest = this.requestService.schUpdateRequestProcess(payload);
    const closePayload = {
      id: `${this.requestId}`,
      isclose: '1',
    };
    const closeRequest = this.requestService.schCloseRequest(closePayload);
    forkJoin([updateRequest, closeRequest]).subscribe(() => {
      this.completeDialog(`ยกเลิกใบคำขอสำเร็จ`);
    });
  }

  createRequest(process: number) {
    const baseForm = this.fb.group(new KspRequest());
    const formData: any = this.form.getRawValue();
    const tab3 = mapMultiFileInfo(this.eduFiles);
    const tab4 = mapMultiFileInfo(this.teachingFiles);
    const tab5 = mapMultiFileInfo(this.reasonFiles);
    const tab6 = mapMultiFileInfo(this.attachFiles);

    formData.addr1.addresstype = 1;
    formData.addr2.addresstype = 2;

    /* let { id, ...userInfo } = formData.userInfo; */
    let { ...userInfo } = formData.userInfo;
    userInfo.schoolid = this.schoolId;
    userInfo.process = `${process}`;
    userInfo.status = `1`;
    userInfo.ref1 = '2';
    userInfo.ref2 = '03';
    userInfo.ref3 = '1';
    userInfo.systemtype = '2';
    userInfo.requesttype = '3';
    userInfo.careertype = `${this.careerType}`;
    userInfo = formatDatePayload(userInfo);

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

    /*     const visaInfo = {
      visaclass: userInfo.visaclass,
      visatype: userInfo.visatype,
      visaenddate: userInfo.visaenddate,
    };
 */
    //console.log('form data = ', formData);

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringinfo) },
      //...{ visainfo: JSON.stringify(visaInfo) },
      ...{ schooladdrinfo: JSON.stringify(formData.schoolAddr) },
      ...{ reasoninfo: JSON.stringify(formData.reasoninfo) },
      ...{ fileinfo: JSON.stringify({ tab3, tab4, tab5, tab6 }) },
      ...{
        prohibitproperty: this.forbidden
          ? JSON.stringify(this.forbidden)
          : null,
      },
    };

    baseForm.patchValue(payload);
    //console.log('current form = ', baseForm.value);
    this.requestService.schCreateRequest(baseForm.value).subscribe((res) => {
      // บันทึกและยื่น

      if (res.returncode === '409') {
        this.duplicateRequestDialog();
        return;
      }

      if (process === 2) {
        this.completeDialog(`ระบบทำการบันทึกเรียบร้อยแล้ว
        เลขที่รายการ : ${formatRequestNo(res.requestno)}
        วันที่ : ${thaiDate(new Date())}`);
        /* this.completeDialog(`ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`); */
      } else if (process === 1) {
        // บันทึกชั่วคราว
        this.completeDialog(`ระบบทำการบันทึกชั่วคราวเรียบร้อยแล้ว`);
      }
    });
  }

  updateRequest(process: number) {
    const baseForm = this.fb.group(new KspRequest());
    const formData: any = this.form.getRawValue();
    const { id, ...userInfo } = formData.userInfo;

    userInfo.id = `${this.requestId}`;
    userInfo.schoolid = this.schoolId;
    userInfo.process = `${process}`;
    userInfo.status = `1`;
    userInfo.ref1 = '2';
    userInfo.ref2 = '03';
    userInfo.ref3 = '1';
    userInfo.systemtype = '2';
    userInfo.requesttype = '3';
    userInfo.careertype = `${this.careerType}`;

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

    /*     const visaInfo = {
      visaclass: userInfo.visaclass,
      visatype: userInfo.visatype,
      visaenddate: userInfo.visaenddate,
    }; */

    const tab3 = mapMultiFileInfo(this.eduFiles);
    const tab4 = mapMultiFileInfo(this.teachingFiles);
    const tab5 = mapMultiFileInfo(this.reasonFiles);
    const tab6 = mapMultiFileInfo(this.attachFiles);

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addressinfo: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ eduinfo: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringinfo) },
      //...{ visainfo: JSON.stringify(visaInfo) },
      ...{ schooladdrinfo: JSON.stringify(formData.schoolAddr) },
      ...{ reasoninfo: JSON.stringify(formData.reasoninfo) },
      ...{ fileinfo: JSON.stringify({ tab3, tab4, tab5, tab6 }) },
      ...{ prohibitproperty: JSON.stringify(this.forbidden || null) },
    };

    baseForm.patchValue(payload);

    const { ref1, ref2, ref3, uniqueno, requestdate, requestno, ...temp } =
      baseForm.value;

    const res = replaceEmptyWithNull(temp);

    //console.log('update payload = ', res);
    this.requestService.schUpdateRequest(res).subscribe(() => {
      if (process === 2) {
        this.completeDialog(`ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`);
      } else if (process === 1) {
        // บันทึกชั่วคราว
        this.completeDialog(`ระบบทำการบันทึกชั่วคราวเรียบร้อยแล้ว`);
      }
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
      //console.log('process = ', this.requestData.process);
      const condition1 =
        this.requestData.requesttype === '3' &&
        this.requestData.process === '3' &&
        this.requestData.status === '2';

      const condition2 =
        this.requestData.requesttype === '3' &&
        this.requestData.process === '4' &&
        this.requestData.status === '2';

      // สถานะ ยกเลิก disable ทุกอย่าง
      if (this.requestData.status === '0') {
        this.disableTempSave = true;
        this.disableSave = false;
        this.disableCancel = true;
      }

      // formValid + ไม่มีหมายเลขใบคำขอ ทำได้ทุกอย่าง
      else if (this.form.valid && !this.requestId) {
        this.disableTempSave = false;
        this.disableSave = false;
      }

      // formValid + สถานะเป็นสร้างใบคำขอ, บันทึกชั่วคราวได้ ส่งใบคำขอได้
      else if (this.form.valid && this.requestData.process === '1') {
        //console.log('สถานะเป็นสร้างใบคำขอ ');
        this.disableTempSave = false;
        this.disableSave = false;
      }

      // formValid + สถานะเป็นสร้างและส่งใบคำขอ, บันทึกชั่วคราวไม่ได้ ส่งใบคำขอไม่ได้
      else if (this.form.valid && this.requestData.process === '2') {
        //console.log('สถานะเป็นสร้างและส่งใบคำขอ ');
        this.disableTempSave = true;
        this.disableSave = false;
      }
      // formValid + สถานะเป็นส่งกลับเพื่อแก้ไข, บันทึกชั่วคราวได้ ส่งใบคำขอได้
      else if (condition1 || condition2) {
        this.disableTempSave = false;
        this.disableSave = false;
      }
      // form invalid
      else {
        this.disableTempSave = true;
        this.disableSave = false;
      }

      // มีหมายเลขใบคำขอแล้ว enable ปุ่มยกเลิก
      if (this.requestId) {
        if (this.requestData.process === '0') {
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
    this.requestService.schGetRequestById(id).subscribe((res) => {
      if (res) {
        this.requestData = res;
        this.pathUserInfo(res);
        this.patchAddress(parseJson(res.addressinfo));
        this.patchEdu(parseJson(res.eduinfo));
        this.patchHiringInfo(parseJson(res.hiringinfo));
        this.patchTeachingInfo(parseJson(res.teachinginfo));
        this.patchReasonInfo(parseJson(res.reasoninfo));
        this.patchFileInfo(parseJson(res.fileinfo));
        const schoolAddr = parseJson(res.schooladdrinfo);
        this.form.controls.schoolAddr.patchValue(schoolAddr);
        //console.log('approve detail = ', parseJson(res.detail));
      }
    });
  }

  patchTeachingInfo(res: any) {
    //console.log('teaching response= ', res);
    //if (!res.teachingLevel) return;
    if (!res) return;
    const teachingLevel = levels.map((level) => {
      if (res?.teachingLevel?.includes(level.value)) {
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
    //console.log('datax = ', data);
    this.form.controls.teachinginfo.patchValue(data);
  }

  patchReasonInfo(res: any) {
    //console.log('path reason = ', res);
    this.form.controls.reasoninfo.patchValue(res);
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
    if (!idCard || this.requestId) return;

    const payload = {
      idcardno: idCard,
      schoolid: this.schoolId,
    };
    this.staffService
      .searchStaffFromIdCard(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res && res.returncode !== '98') {
          this.staffData = res;
          this.pathUserInfo(res);
          this.patchAddress(parseJson(res.addresses));
          this.patchEdu(parseJson(res.educations));
          this.patchTeachingInfo(parseJson(res.teachinginfo));
          this.patchHiringInfo(parseJson(res.hiringinfo));
          this.patchSchoolInfo();
        } else {
          // search not found reset form and set idcard again
          this.searchIdCardNotFound(`ไม่พบข้อมูลบุคลากรภายในหน่วยงาน
          จากหมายเลขบัตรประชาชนที่ระบุ`);
          this.form.reset();
          const temp: any = { idcardno: idCard };
          this.form.controls.userInfo.patchValue(temp);
        }
      });
  }

  searchStaffFromKuruspaNo(kuruspano: string) {
    if (!kuruspano || this.requestId) return;
    const payload = {
      kuruspano,
      schoolid: this.schoolId,
    };

    this.staffService
      .searchStaffFromKuruspaNo(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        //console.log('res = ', res);
        if (res && res.returncode !== '98') {
          this.pathUserInfo(res);
          this.patchAddress(parseJson(res.addresses));
          this.patchEdu(parseJson(res.educations));
          this.patchTeachingInfo(parseJson(res.teachinginfo));
          this.patchHiringInfo(parseJson(res.hiringinfo));
          this.patchSchoolInfo();
        } else {
          // search not found reset form and set idcard again
          this.searchIdCardNotFound(`ไม่พบข้อมูลบุคลากรภายในหน่วยงาน
          จากหมายเลขคุรุสภาสำหรับชาวต่างชาติที่ระบุ`);
          // this.form.reset();
          // const temp: any = { idcardno: idCard };
          // this.form.controls.userInfo.patchValue(temp);
        }
      });
  }

  patchSchoolInfo() {
    this.form.controls.schoolAddr.patchValue(<any>this.schoolInfo);
  }

  pathUserInfo(data: any) {
    data.birthdate = data?.birthdate?.split('T')[0];

    if (this.careerType === SchoolRequestSubType.ชาวต่างชาติ) {
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
    this.getSchoolInfo();
  }

  getSchoolInfo() {
    const payload = {
      schoolid: this.schoolId,
    };
    this.schoolInfoService
      .getSchoolInfo(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.schoolInfo = res;
      });
  }

  checkStaffAnotherRequest(saveType: 'tempSave' | 'submitSave') {
    //console.log('staff data = ', this.staffData);
    const payload: SchRequestSearchFilter = {
      schoolid: `${this.schoolId}`,
      requesttype: '3',
      requestno: null,
      careertype: null,
      name: null,
      idcardno: this.staffData.idcardno,
      passportno: null,
      process: null,
      status: null,
      requestdatefrom: null,
      requestdateto: null,
      offset: '0',
      row: '100',
    };

    // update mode
    if (this.requestId) {
      if (saveType === 'submitSave') {
        this.forbiddenDialog();
      } else if (saveType === 'tempSave') {
        this.confirmDialog(1);
      }
      return;
    }

    // create mode
    this.requestService.schSearchRequest(payload).subscribe((res) => {
      if (saveType === 'submitSave') {
        this.forbiddenDialog();
      } else if (saveType === 'tempSave') {
        this.confirmDialog(1);
      }
      /*       if (res && res.length) {
        //console.log('found request for this staff = ', res);
        this.completeDialog(`บุคคลากรมีใบคำขอที่กำลังดำเนินการในระบบ
        ไม่สามารถสร้างใบคำขอใหม่ได้ `);
      } else {
        //console.log('no request for this staff = ');
        if (saveType === 'submitSave') {
          this.forbiddenDialog();
        } else if (saveType === 'tempSave') {
          this.confirmDialog(1);
        }
      } */
    });
  }

  forbiddenDialog() {
    const dialogRef = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '850px',
      data: {
        uniqueTimeStamp: this.uniqueNo,
      },
    });

    dialogRef.componentInstance.confirmed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.forbidden = res;
        if (res) {
          // confirm เพื่อ บันทึกและยื่นใบคำขอ
          this.confirmDialog(2);
        }
      });
  }

  /**
   *
   * @param
   * process = 1 บันทึกชั่วคราว
   * process = 2 บันทึกและยื่น
   *
   */
  confirmDialog(process: number) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle:
          process === 2
            ? `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`
            : '',
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          if (this.requestId) {
            this.updateRequest(process);
          } else {
            this.createRequest(process);
          }
        }
      });
  }

  cancelConfirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอ
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.cancelRequest();
        }
      });
  }

  completeDialog(header: string) {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header,
      },
    });

    dialog.componentInstance.completed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.backToListPage();
        }
      });
  }

  searchIdCardNotFound(header: string) {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: header,
        btnLabel: 'เพิ่มข้อมูลบุคลากร',
      },
    });

    dialog.componentInstance.completed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/staff-management', 'list']);
        }
      });
  }

  backToListPage() {
    this.router.navigate(['/temp-license', 'list']);
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
}
