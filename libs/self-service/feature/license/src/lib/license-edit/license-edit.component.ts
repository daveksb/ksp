import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import {
  GeneralInfoService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import {
  formatDatePayload,
  formatRequestNo,
  getCookie,
  parseJson,
  thaiDate,
} from '@ksp/shared/utility';
import {
  FileGroup,
  KspRequest,
  Prefix,
  SelfLicense,
  SelfRequest,
} from '@ksp/shared/interface';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'self-service-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.css'],
})
export class LicenseEditComponent implements OnInit {
  prefixList$!: Observable<Prefix[]>;
  oldValue: any;
  uploadFileList: FileGroup[] = [];
  uniqueTimestamp!: string;
  requestId!: number;
  requestData!: SelfRequest;
  myLicense = new SelfLicense();
  form1 = this.fb.group({
    userInfo: [],
  });
  form2 = this.fb.group({
    editData: [],
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private myInfoService: MyInfoService,
    private requestService: SelfRequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
    }); */
    this.getListData();
    this.checkRequestId();
  }

  getMyLicense() {
    const idcardno = getCookie('idCardNo');
    this.myInfoService.getMyLicense(idcardno).subscribe((res) => {
      if (res) {
        this.myLicense = res[0];
        this.form1.controls.userInfo.patchValue(<any>this.myLicense);
        this.oldValue = this.myLicense;
        //console.log('my license = ', this.myLicense);
      }
    });
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        // this.loadRequestFromId(this.requestId);
        this.requestService.getRequestById(this.requestId).subscribe((res) => {
          if (res) {
            //console.log(res);
            this.requestData = res;
            this.uniqueTimestamp = res.uniqueno || '';
            this.patchData(res);
          }
        });
      } else {
        this.initializeFile();
        this.getMyLicense();
      }
    });
  }

  patchData(data: SelfRequest) {
    //console.log(data);
    if (data.replacereasoninfo) {
      const replaceReasonInfo = parseJson(data.replacereasoninfo);
      //console.log(replaceReasonInfo);
      this.form2.controls.editData.patchValue(replaceReasonInfo);
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      //console.log(fileInfo);
      const { attachfiles } = fileInfo;
      this.uploadFileList = attachfiles;
    }
  }

  initializeFile() {
    this.uniqueTimestamp = uuidv4();
    this.uploadFileList = structuredClone(FILE_LIST);
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  createRequest(currentProcess: number) {
    const form: any = this.form2.controls.editData.getRawValue();
    /*   const {
      //id,
      // updatedate,
      // addressinfo,
      // schooladdrinfo,
      birthdate,
      ...rawData
    } = this.oldValue || {
      //id: null,
      updatedate: null,
      addressinfo: null,
      schooladdrinfo: null,
      birthdate: null,
    };
    const data = toLowercaseProp(rawData);
    const type = SelfServiceRequestSubType.อื่นๆ;
    const self = new SelfRequest(
      '1',
      SelfServiceRequestType['ขอเปลี่ยนแปลง/แก้ไขหนังสืออนุญาตประกอบวิชาชีพ'],
      '1', //`${type}`,
      currentProcess
    );
    const allowKey = Object.keys(self);
    self.isforeign = `${SelfServiceRequestForType.ชาวไทย}`;
    self.uniqueno = this.uniqueTimestamp;
    self.userid = getCookie('userId');
    const attachfiles = this.uploadFileList;
    const initialPayload = {
      ...replaceEmptyWithNull(data),
      ...(this.requestId && { id: `${this.requestId}` }),
      ...{
        replacereasoninfo: JSON.stringify({ ...formData.editData }),
      },
      ...{ fileinfo: JSON.stringify({ attachfiles }) },
    };
    const payload = _.pick({ ...self, ...initialPayload }, allowKey);
    const {
      id,
      updatedate,
      requestid,
      lastupdatesystemtype,
      processupdatedate,
      createdate,
      requesttable,
      requestdate,
      isurgent,
      listno,
      groupno,
      isclose,
      detail,
      requestno,
      paymentstatus,
      ...temp
    } = payload;
    console.log('current payload =', temp); */

    console.log('form data = ', form);

    const attachfiles = this.uploadFileList;

    const test: Partial<KspRequest> = {
      licenseid: this.myLicense.id,
      systemtype: '1',
      requesttype: '3',
      schoolid: null,
      idcardno: getCookie('idCardNo'),
      passportno: null,
      passportstartdate: null,
      passportenddate: null,
      prefixth: form.prefixTh,
      firstnameth: this.myLicense.firstnameth, //form.firstnameTh,
      lastnameth: this.myLicense.lastnameth, //form.lastnameTh,
      prefixen: this.myLicense.prefixen, //form.prefixEn,
      firstnameen: this.myLicense.firstnameen, //form.firstnameEn,
      lastnameen: this.myLicense.lastnameen, //form.lastnameEn,
      sex: this.myLicense.sex,
      birthdate: this.myLicense.birthdate,
      email: this.myLicense.email,
      position: null,
      educationoccupy: null,
      contactphone: this.myLicense.contactphone,
      workphone: null,
      nationality: null,
      country: null,
      coordinatorinfo: null,
      userpermission: null,
      addressinfo: null,
      schooladdrinfo: null,
      eduinfo: null,
      teachinginfo: null,
      reasoninfo: null,
      fileinfo: JSON.stringify({ attachfiles }),
      otherreason: null,
      refperson: null,
      prohibitproperty: null,
      checkprohibitproperty: null,
      middlenameen: null,
      middlenameth: null,
      submissiondocno: null,
      submissiondocdate: null,
      hiringinfo: null,
      imagefileid: null,
      experienceinfo: null,
      competencyinfo: null,
      performanceinfo: null,
      replacereasoninfo: JSON.stringify(form),
      transferknowledgeinfo: null,
      testresultcompareinfo: null,
      feerefundinfo: null,
      grantionteachinglicenseinfo: null,
      rewardtype: null,
      osoiinfo: null,
      osoimember: null,
      osoicheck: null,
      osoiresult: null,
      osoireject: null,
      osoiwithdraw: null,
      rewardethicinfo: null,
      rewardsuccessinfo: null,
      rewarddetailinfo: null,
      rewardpunishmentinfo: null,
      rewardteacherinfo: null,
      rewardretiredate: null,
      rewardcareerinfo: null,
      rewardmoneysupportinfo: null,
      rewardresearcherinfo: null,
      rewardresearchinfo: null,
      rewardresearchhistory: null,
      careertype: '1',
      isforeign: '0',
      kuruspano: null,
      schooladdress: null,
      schoolname: null,
      bureauid: null,
      uniqueno: this.uniqueTimestamp,
      foreigncheckdocument: null,
      foreignpassporttype: null,
      foreignperformanceresult: null,
      foreignlicensureinfo: null,
      visaclass: null,
      visatype: null,
      visaexpiredate: null,
      prohibitpropertyfile: null,
      foreignselectupload: null,
      uniid: null,
      unitype: null,
      bureauname: null,
      ref1: '1',
      ref2: '03',
      ref3: '1',
      process: '2',
      status: '1',
      userid: getCookie('userId'),
    };
    //console.log('correct payliad = ', test);
    return formatDatePayload(test);
  }

  onConfirm() {
    //console.log(this.form.getRawValue());
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่`,
        subTitle: `คุณต้องการบันทึกข้อมูลและยื่นแบบคำขอใช่หรือไม่`,
        cancelBtnLabel: 'บันทึก',
        btnLabel: 'ยื่นแบบคำขอ',
      },
    });

    dialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(1);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          //console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.router.navigate(['/home']);
          }
        });
      }
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(2);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          //console.log('request result = ', res);
          if (res.returncode === '00') {
            this.onSaveAndRequest(res);
          }
        });
      }
    });
  }

  onSaveAndRequest(res: any) {
    const today = new Date();
    const dialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลและยื่นแบบคำขอสำเร็จเรียบร้อย`,
        content: `วันที่ : ${thaiDate(today)}
        เลขที่แบบคำขอ : ${formatRequestNo(res.requestno)}`,
        subContent: `กรุณาตรวจสอบสถานะแบบคำขอหรือรหัสเข้าใช้งาน
          ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });
    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.navigateBack();
      }
    });
  }

  onCancel() {
    if (this.requestId) {
      this.cancel();
    } else {
      this.navigateBack();
    }
  }

  cancel() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยกเลิกรายการแบบคำขอ
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.cancelRequest();
      }
    });
  }

  cancelRequest() {
    const payload = {
      requestid: `${this.requestId}`,
      process: '0',
    };

    this.requestService.cancelRequest(payload).subscribe((res) => {
      //console.log('Cancel request  = ', res);
      const closePayload = {
        id: `${this.requestId}`,
        isclose: '1',
      };
      //console.log('close request = ');
      this.requestService.closeRequest(closePayload).subscribe((res) => {
        this.cancelCompleted();
      });
    });
  }

  cancelCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ยกเลิกแบบคำขอสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }
}

export type controlName =
  | 'prefixTh'
  | 'prefixEn'
  | 'nameTh'
  | 'nameEn'
  | 'lastnameTh'
  | 'lastnameEn'
  | 'distributeData';

const FILE_LIST: FileGroup[] = [
  {
    name: '1. สำเนาหนังสือสำคัญการเปลี่ยนชื่อ/ชื่อสกุล/เปลี่ยนหรือเพิ่มคำนำหน้าชื่อ',
    files: [],
  },
  {
    name: '2. สำเนาหลักฐานการสมรส หรือการสิ้นสุดการสมรส (ถ้ามี)',
    files: [],
  },
  {
    name: '3. สำเนาหนังสือรับรองการใช้คำหน้านามหญิง (ถ้ามี)',
    files: [],
  },
];
