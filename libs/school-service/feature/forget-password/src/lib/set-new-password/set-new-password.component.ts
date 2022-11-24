import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { SchForgetPassword } from '@ksp/shared/interface';
import { SchoolUserService } from '@ksp/shared/service';
import { passwordPattern, validatorMessages } from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';
import localForage from 'localforage';
import * as CryptoJs from 'crypto-js';

@UntilDestroy()
@Component({
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
})
export class SetNewPasswordComponent implements OnInit {
  eyeIconClicked = false;
  eyeIconClickedSecond = false;
  validatorMessages = validatorMessages;
  payload!: SchForgetPassword;
  username = '';

  form = this.fb.group({
    password: [
      null,
      [Validators.required, Validators.pattern(passwordPattern)],
    ],
    rePassword: [null, Validators.required],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private userService: SchoolUserService
  ) {}

  get disableBtn() {
    const { password, rePassword } = this.form.getRawValue();
    this.validatorMessages.passwordNotMatching;
    return password !== rePassword || !password || !rePassword;
  }

  get passwordNotMatching() {
    const { password, rePassword } = this.form.getRawValue();
    this.validatorMessages.passwordNotMatching;
    return password !== rePassword && rePassword;
  }

  get password() {
    return this.form.controls.password;
  }

  ngOnInit(): void {
    localForage.getItem('schSetNewPassword').then((res: any) => {
      this.payload = res;
      this.username = res.schoolid;
      console.log('res = ', res);
    });
  }

  navigateBack() {
    this.router.navigate(['/login']);
  }

  accept() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: `ใช่`,
        cancelBtnLabel: 'ไม่ใช่',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.setNewPassword();
      }
    });
  }

  setNewPassword() {
    const form = this.form.value;
    const password = CryptoJs.SHA256(`${form.password}`).toString();
    this.payload = { ...this.payload, ...{ schpassword: password } };
    this.userService.setForgetPassword(this.payload).subscribe(() => {
      this.onCompleted();
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ทำรายการสำเร็จ`,
        subContent: `ระบบได้ทำการเปลี่ยนรหัสผ่านให้ท่านเรียบร้อยแล้ว
        กรุณาเข้าสู่ระบบใหม่อีกครั้ง`,
        btnLabel: 'เข้าสู่ระบบ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        localForage.removeItem('schSetNewPassword');
        this.navigateBack();
      }
    });
  }
}
