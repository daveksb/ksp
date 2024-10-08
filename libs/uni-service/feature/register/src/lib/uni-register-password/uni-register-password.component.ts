import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormMode } from '@ksp/shared/interface';
import { EMPTY, Subject, switchMap } from 'rxjs';
import localForage from 'localforage';
import {
  formatRequestNo,
  getCookie,
  mapMultiFileInfo,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import { LoaderService, UniRequestService } from '@ksp/shared/service';
import * as CryptoJs from 'crypto-js';

@Component({
  templateUrl: './uni-register-password.component.html',
  styleUrls: ['./uni-register-password.component.scss'],
})
export class UniRegisterPasswordComponent implements OnInit {
  form = this.fb.group({
    password: [
      null,
      [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(/^[\w\s]+$/),
      ],
    ],
    repassword: [
      null,
      [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(/^[\w\s]+$/),
      ],
    ],
  });
  savingData: any;
  requestDate = thaiDate(new Date());
  requestNumber = '';

  mode: FormMode = 'edit';
  uniData: any;
  coordinator: any;
  uploadFileList: Array<any> = [];
  requesttype = '1';
  systemtype = '3';
  currentprocess = '1';
  eyeIconClicked = false;
  eyeIconClickedRe = false;
  wrongpass = false;
  submit = false;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: UniRequestService,
    private loaderService: LoaderService
  ) {}
  get disable() {
    const { password, repassword } = this.form.getRawValue();
    return password !== repassword || !password || !repassword;
  }
  ngOnInit(): void {
    localForage.getItem('registerSelectedUniversity').then((res: any) => {
      if (res) {
        this.uniData = res;
      }
    });

    localForage.getItem('registerUserForm').then((res) => {
      this.savingData = res;
    });

    localForage.getItem('registerCoordinatorForm').then((res: any) => {
      if (res) {
        this.coordinator = res.form.coordinator;
        this.uploadFileList = res.file;
      }
    });
  }

  cancel() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยกเลิกรายการแบบคำขอ
        ใช่หรือไม่?`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยกเลิกรายการสำเร็จ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        localForage.removeItem('registerSelectedUniversity');
        localForage.removeItem('registerUserForm');
        localForage.removeItem('registerCoordinatorForm');
        this.router.navigate(['/login']);
      }
    });
  }

  back() {
    this.router.navigate(['register', 'coordinator']);
  }

  save() {
    this.submit = true;
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        schoolCode: `รหัสเข้าใช้งาน(หมายเลขบัตรประชาชน): ${this.savingData?.idcardno}`,
        btnLabel: 'บันทึก',
      },
    });

    // waiting api for encoding password
    // const password = CryptoJs.SHA256(
    //   `${this.form?.value?.password}`
    // ).toString();

    // save raw password
    const password = this.form?.value?.password;

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            this.savingData = replaceEmptyWithNull(this.savingData);
            const educationoccupy = {
              permission: this.savingData.permission,
              other: this.savingData.other,
              ...this.uniData,
            };
            const fileUpload = mapMultiFileInfo(this.uploadFileList);
            const payload = {
              ...this.uniData,
              ...this.savingData,
              educationoccupy: JSON.stringify(educationoccupy),
              coordinatorinfo: JSON.stringify({
                ...this.coordinator,
                password,
              }),
              fileinfo: JSON.stringify({ fileUpload }),
            };
            payload.ref1 = '3';
            payload.ref2 = '01';
            payload.ref3 = '5';
            payload.systemtype = this.systemtype;
            payload.requesttype = this.requesttype;
            payload.careertype = '5';
            payload.status = '1';
            payload.process = '1';
            // payload.userpermission = this.savingData.permission;
            payload.currentprocess = this.currentprocess;
            return this.requestService.createRequestKsp(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.submit = false;
          const requestNo = res?.requestno;
          this.showCompleteDialog(requestNo);
        }
      });
  }

  showCompleteDialog(requestNo: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : ${this.requestDate}
        เลขที่แบบคำขอ : ${formatRequestNo(requestNo)}`,
        subContent: `กรุณาตรวจสอบสถานะแบบคำขอผ่านทางอีเมล
        ผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        localForage.removeItem('registerSelectedUniversity');
        localForage.removeItem('registerUserForm');
        localForage.removeItem('registerCoordinatorForm');
        this.router.navigate(['/login']);
      }
    });
  }
}
