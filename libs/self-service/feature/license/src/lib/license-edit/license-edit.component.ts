import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, tap } from 'rxjs';
import {
  GeneralInfoService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import { replaceEmptyWithNull, toLowercaseProp } from '@ksp/shared/utility';
import { SelfRequest } from '@ksp/shared/interface';
import { SelfServiceRequestSubType } from '@ksp/shared/constant';
import * as _ from 'lodash';
import { SchoolRequest } from '@ksp/shared/interface';

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

  uploadFileList = [
    'สำเนาหนังสือสำคัญการเปลี่ยนชื่อ/ชื่อสกุล/เปลี่ยนหรือเพิ่มคำนำหน้าชื่อ',
    'สำเนาหลักฐานการสมรส หรือการสิ้นสุดการสมรส (ถ้ามี)',
    'สำเนาหนังสือรับรองการใช้คำหน้านามหญิง (ถ้ามี)',
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private myInfoService: MyInfoService,
    private requestService: SelfRequestService
  ) {}

  ngOnInit(): void {
    this.form.disable();
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //
    });
    this.getListData();
    this.getMyInfo();
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
    this.router.navigate(['/', 'home']);
  }

  createRequest(currentProcess: string) {
    const formData: any = this.form.getRawValue();
    const { userInfo: rawUserInfo } = formData;
    const userInfo = toLowercaseProp(rawUserInfo);
    const type = SelfServiceRequestSubType.ครู;

    const self = new SelfRequest('1', '03', `${type}`);
    const allowKey = Object.keys(self);

    const {
      firstnameen,
      firstnameth,
      lastnameen,
      lastnameth,
      prefixen,
      prefixth,
    } = this.oldValue;

    const initialPayload = {
      ...replaceEmptyWithNull({
        firstnameen,
        firstnameth,
        lastnameen,
        lastnameth,
        prefixen,
        prefixth,
        ...userInfo,
      }),
    };
    initialPayload.currentprocess = currentProcess;
    initialPayload.requeststatus = '1';
    const payload = _.pick(initialPayload, allowKey);
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
        const payload = this.createRequest('0');
        this.requestService.createRequest(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.router.navigate(['/home']);
          }
        });
      }
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest('1');
        this.requestService.createRequest(payload).subscribe((res) => {
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
}

export type controlName =
  | 'prefixTh'
  | 'prefixEn'
  | 'nameTh'
  | 'nameEn'
  | 'lastnameTh'
  | 'lastnameEn'
  | 'distributeData';
