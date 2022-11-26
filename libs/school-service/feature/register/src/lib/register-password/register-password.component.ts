import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormMode, KspRequest, SchInfo } from '@ksp/shared/interface';
import { EMPTY, switchMap } from 'rxjs';
import localForage from 'localforage';
import {
  formatRequestNo,
  thaiDate,
  validatePassword,
  validatorMessages,
} from '@ksp/shared/utility';
import * as CryptoJs from 'crypto-js';
import { SchoolRequestService } from '@ksp/shared/service';

@Component({
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss'],
})
export class RegisterPasswordComponent implements OnInit {
  eyeIconClicked = false;
  eyeIconClickedSecond = false;
  mode: FormMode = 'edit';
  school!: SchInfo;
  address: any;
  coordinator: any;
  savingData: any;
  fileInfo: any;
  validatorMessages = validatorMessages;
  form = this.fb.group({
    password: [
      null,
      [Validators.required, Validators.minLength(8), validatePassword],
    ],
    repassword: [null, [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: SchoolRequestService
  ) {}

  ngOnInit(): void {
    this.loadStoredData();
  }

  clearStoredData() {
    localForage.removeItem('registerSelectedSchool');
    localForage.removeItem('registerUserInfo');
    localForage.removeItem('registerCoordinator');
    localForage.clear();
  }

  loadStoredData() {
    localForage.getItem('registerSelectedSchool').then((res: any) => {
      this.school = res;
      this.address = `เลขที่ ${res.address} ซอย ${res?.street ?? '-'} หมู่ ${
        res?.moo ?? '-'
      } ถนน ${res?.road ?? '-'} ตำบล ${res.tumbon} อำเภอ ${
        res.amphurname
      } จังหวัด ${res.provincename} รหัสไปรษณีย์ ${res.zipcode}`;
    });

    localForage.getItem('registerUserInfo').then((res) => {
      this.savingData = res;
    });

    localForage.getItem('registerCoordinator').then((res) => {
      this.coordinator = res;
    });

    localForage.getItem('registerFile').then((res) => {
      this.fileInfo = JSON.stringify(res);
    });
  }

  confirmCancelDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอ
        ใช่หรือไม่?`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.cancelCompleteDialog();
      }
    });
  }

  cancelCompleteDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: 'ยกเลิกรายการสำเร็จ',
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/login']);
      }
    });
  }

  back() {
    this.router.navigate(['register', 'coordinator']);
  }

  save() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        schoolCode: `รหัสเข้าใช้งาน(รหัสโรงเรียน) : ${this.school?.schoolid}`,
        btnLabel: 'บันทึก',
      },
    });

    const password = CryptoJs.SHA256(
      `${this.form.controls.password.value}`
    ).toString();

    dialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const coordinatorinfo = JSON.stringify({
              ...this.coordinator,
              password,
            });
            const payload: KspRequest = {
              ...this.savingData,
            };
            payload.coordinatorinfo = coordinatorinfo;
            payload.ref1 = '2';
            payload.ref2 = '01';
            payload.ref3 = '5';
            payload.systemtype = '2';
            payload.requesttype = '1';
            payload.careertype = '5';
            payload.process = '1';
            payload.status = '1';
            payload.schoolid = this.school.schoolid;
            payload.schoolname = this.school.schoolname;
            payload.schooladdress = this.address;
            payload.schooladdrinfo = JSON.stringify(this.school.provincename); // save province name
            payload.bureauid = this.school.bureauid;
            payload.bureauname = this.school.bureauname;
            payload.fileinfo = this.fileInfo;
            //console.log('payload = ', payload);
            return this.requestService.schCreateRequest(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res: any) => {
        if (res) {
          const requestNo = res?.requestno;
          this.submitCompleteDialog(requestNo);
        }
      });
  }

  submitCompleteDialog(requestNo: string) {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่ใบคำขอ : ${formatRequestNo(requestNo)}`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอผ่านทางอีเมล
        ผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    dialog.componentInstance.completed.subscribe(() => {
      this.clearStoredData();
      this.router.navigate(['/login']);
    });
  }

  get password() {
    return this.form.controls.password;
  }

  get repassword() {
    return this.form.controls.repassword;
  }

  get disableBtn() {
    const { password, repassword } = this.form.getRawValue();
    return password !== repassword || !password || !repassword;
  }
}
