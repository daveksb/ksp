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
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  toLowercaseProp,
} from '@ksp/shared/utility';
import { SelfRequest } from '@ksp/shared/interface';
import {
  SelfServiceRequestForType,
  SelfServiceRequestSubType,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const FILE_LIST = [
  {
    name: 'สำเนาหนังสือสำคัญการเปลี่ยนชื่อ/ชื่อสกุล/เปลี่ยนหรือเพิ่มคำนำหน้าชื่อ',
    fileId: '',
    fileName: '',
  },
  {
    name: 'สำเนาหลักฐานการสมรส หรือการสิ้นสุดการสมรส (ถ้ามี)',
    fileId: '',
    fileName: '',
  },
  {
    name: 'สำเนาหนังสือรับรองการใช้คำหน้านามหญิง (ถ้ามี)',
    fileId: '',
    fileName: '',
  },
];

@UntilDestroy()
@Component({
  selector: 'self-service-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.css'],
})
export class LicenseEditComponent implements OnInit {
  prefixList$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
  });

  oldValue: any;

  uploadFileList: any[] = [];

  uniqueTimestamp!: string;
  requestId!: number;
  requestData!: SelfRequest;
  requestNo: string | null = '';
  currentProcess!: number;

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
    this.form.disable();
    /* this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {

    }); */
    this.getListData();
    this.checkRequestId();
    // this.getMyInfo();
    // this.initializeFile();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        // this.loadRequestFromId(this.requestId);
        this.requestService.getRequestById(this.requestId).subscribe((res) => {
          if (res) {
            console.log(res);
            this.requestData = res;
            this.requestNo = res.requestno;
            this.currentProcess = Number(res.currentprocess);
            this.uniqueTimestamp = res.uniquetimestamp || '';
            console.log(this.uniqueTimestamp);

            this.patchData(res);
          }
        });
      } else {
        this.initializeFile();
        this.getMyInfo();
      }
    });
  }

  patchData(data: SelfRequest) {
    console.log(data);
    if (data.replacereasoninfo) {
      const replaceReasonInfo = parseJson(data.replacereasoninfo);
      console.log(replaceReasonInfo);
      this.form.controls.userInfo.patchValue(replaceReasonInfo);
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      console.log(fileInfo);
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

  getMyInfo() {
    this.myInfoService.getMyInfo().subscribe((res) => {
      console.log(res);
      if (res) {
        this.oldValue = res;
      }
    });
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  createRequest(currentProcess: number) {
    const formData: any = this.form.getRawValue();
    const {
      id,
      updatedate,
      addressinfo,
      schooladdrinfo,
      birthdate,
      ...rawUserInfo
    } = this.oldValue || {
      id: null,
      updatedate: null,
      addressinfo: null,
      schooladdrinfo: null,
      birthdate: null,
    };
    const userInfo = toLowercaseProp(rawUserInfo);
    const type = SelfServiceRequestSubType.อื่นๆ;

    const self = new SelfRequest(
      '1',
      SelfServiceRequestType['ขอเปลี่ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ'],
      `${type}`,
      currentProcess
    );
    const allowKey = Object.keys(self);
    userInfo.requestfor = `${SelfServiceRequestForType.ชาวไทย}`;
    userInfo.uniquetimestamp = this.uniqueTimestamp;
    userInfo.staffid = getCookie('userId');
    userInfo.birthdate = birthdate?.split('T')[0];

    const attachfiles = this.uploadFileList;

    const initialPayload = {
      ...replaceEmptyWithNull(userInfo),
      ...(this.requestId && { id: `${this.requestId}` }),
      ...{
        replacereasoninfo: JSON.stringify({ ...formData.userInfo }),
      },
      ...{ fileinfo: JSON.stringify({ attachfiles }) },
    };
    const payload = _.pick({ ...self, ...initialPayload }, allowKey);
    console.log(payload);

    return payload;
  }

  onConfirm() {
    console.log(this.form.getRawValue());
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่`,
        subTitle: `คุณต้องการบันทึกข้อมูลและยื่นใบคำขอใช่หรือไม่`,
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
          console.log('request result = ', res);
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
          console.log('request result = ', res);
          if (res.returncode === '00') {
            this.onSaveAndRequest();
          }
        });
      }
    });
  }

  onSaveAndRequest() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลและยื่นใบคำขอสำเร็จเรียบร้อย`,
        content: `วันที่ : 22 พฤศจิกายน 2565
        เลขที่ใบคำขอ : SF_ED_12234467876543 `,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
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
      width: '350px',
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอ
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
      id: `${this.requestId}`,
      requeststatus: '0',
    };

    this.requestService.cancelRequest(payload).subscribe((res) => {
      //console.log('Cancel request  = ', res);
      this.cancelCompleted();
    });
  }

  cancelCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ยกเลิกใบคำขอสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
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
