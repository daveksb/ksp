import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UserInfoFormType,
  SelfServiceRequestType,
  SelfServiceRequestSubType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  FileGroup,
  KspRequestCancelPayload,
  Prefix,
  SelfMyInfo,
  SelfRequest,
} from '@ksp/shared/interface';
import {
  MyInfoService,
  SelfRequestService,
  GeneralInfoService,
  LoaderService,
} from '@ksp/shared/service';
import {
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ksp-refund-fee-request',
  templateUrl: './refund-fee-request.component.html',
  styleUrls: ['./refund-fee-request.component.scss'],
})
export class RefundFeeRequestComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  files: FileGroup[] = [];
  headerGroup = ['วันที่ทำรายการ', 'เลขแบบคำขอ'];
  userInfoType = UserInfoFormType.thai;
  today = thaiDate(new Date());
  userInfo!: SelfMyInfo;
  prefixList$!: Observable<Prefix[]>;
  uniqueTimestamp!: string;
  requestId!: number;
  requestData!: SelfRequest;
  requestNo: string | null = '';
  currentProcess!: number;
  myInfo$!: Observable<SelfMyInfo>;
  form = this.fb.group({
    userInfo: [],
    refundInfo: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private myInfoService: MyInfoService,
    private requestService: SelfRequestService,
    private generalInfoService: GeneralInfoService,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.myInfo$ = this.myInfoService.getMyInfo();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.checkRequestId();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService.getRequestById(this.requestId).subscribe((res) => {
          if (res) {
            //console.log(res);
            this.requestData = res;
            this.requestNo = res.requestno;
            this.currentProcess = Number(res.process);
            this.uniqueTimestamp = res.uniqueno || '';
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
    const { fileinfo, feerefundinfo, ...resData } = data;
    this.form.controls.userInfo.patchValue(<any>resData);

    if (feerefundinfo) {
      const feeRefundInfo = parseJson(feerefundinfo);
      this.form.controls.refundInfo.patchValue({ ...feeRefundInfo });
    }

    if (fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      console.log(fileInfo);
      const { attachfiles } = fileInfo;
      this.files = attachfiles;
    }
  }

  getMyInfo() {
    this.myInfoService.getMyInfo().subscribe((res) => {
      this.userInfo = {
        ...res,
        birthdate: res.birthdate?.split('T')[0] || null,
        contactphone: res.phone,
      };
      this.form.controls.userInfo.patchValue(<any>this.userInfo);
    });
  }

  resetForm() {
    this.form.reset();
    this.files = structuredClone(ATTACH_FILES);
  }

  initializeFile() {
    this.uniqueTimestamp = uuidv4();
    this.files = structuredClone(ATTACH_FILES);
  }

  createRequest() {
    //const payload = this.form.value;
    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอคืนเงินค่าธรรมเนียม,
      `${SelfServiceRequestSubType.อื่นๆ}`
    );
    const allowKey = Object.keys(self);
    const userInfo = this.form.controls.userInfo.value as any;
    self.isforeign = `${SelfServiceRequestForType.ชาวไทย}`;
    self.uniqueno = this.uniqueTimestamp;
    self.userid = getCookie('userId');

    const attachfiles = this.files;

    const selectData: any = _.pick(userInfo, allowKey);
    const filledData = {
      ...self,
      ...selectData,
      ...{ fileinfo: JSON.stringify({ attachfiles }) },
    };
    const {
      id,
      requestdate,
      updatedate,
      addressinfo,
      schooladdrinfo,
      ...payload
    } = replaceEmptyWithNull(filledData);

    const feeRefundInfo = this.form.controls.refundInfo.value;
    //console.log('fee refund info = ', feeRefundInfo);
    payload.feerefundinfo = JSON.stringify(feeRefundInfo);
    payload.birthdate = payload.birthdate.split('T')[0];
    if (this.requestId) {
      payload.id = this.requestId;
    }

    console.log('payload = ', payload);
    return payload;
  }

  submit() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขอนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest();
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          //console.log('res = ', res);
          if (res?.returncode === '00') {
            this.onCompleted();
          }
        });
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        subContent: `รายการแบบคำขอของท่าน
        ระยะเวลาดำเนินการ 30 - 45  วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
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
    const payload: KspRequestCancelPayload = {
      requestid: `${this.requestId}`,
      process: `${this.requestData.process}`,
      userid: getCookie('userId'),
    };

    this.requestService.cancelRequest(payload).subscribe(() => {
      this.cancelCompleted();
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

const ATTACH_FILES: FileGroup[] = [
  {
    name: '1. สำเนาหน้าแรกสมุดเงินฝาก',
    files: [],
  },
];
