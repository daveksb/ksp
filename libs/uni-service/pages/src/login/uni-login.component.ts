import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
  ForgotPasswordSearchPersonComponent,
  ForgotPasswordSetNewPasswordComponent,
} from '@ksp/shared/dialog';
import { LoginFormComponent } from '@ksp/shared/form/login';
import { ReactiveFormsModule } from '@angular/forms';
import { UniLoginService } from './uni-login.service';
import { lastValueFrom } from 'rxjs';
import { setCookie } from '@ksp/shared/utility';
import localForage from 'localforage';

@Component({
  selector: 'uni-service-login',
  templateUrl: './uni-login.component.html',
  styleUrls: ['./uni-login.component.scss'],
  standalone: true,
  imports: [CommonModule, LoginFormComponent, ReactiveFormsModule],
})
export class UniLoginComponent {
  loginFail = false;

  form = this.fb.group({
    user: {},
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniLoginService: UniLoginService
  ) {}

  /* showWarningDialog(title: string) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: title,
        isDanger: true,
      },
    });
  } */
  async login() {
    this.loginFail = false;
    try {
      const res = await lastValueFrom<any>(
        this.uniLoginService.validateLogin(this.form?.value?.user)
      );
      if (res?.returncode == 99) {
        this.form.reset();
        this.loginFail = true;
        return;
      }
      setCookie('userToken', res?.usertoken || '', 1);
      setCookie('systemName', 'uni-service' || '', 1);
      setCookie('firstNameTh', res?.firstnameth || '', 1);
      setCookie('lastNameTh', res?.lastnameth || '', 1);
      setCookie('uniId', res?.uniid || '', 1);
      setCookie('uniType', res?.unitype || '', 1);
      setCookie('userId', res?.id, 1);
      setCookie('permission', res?.permissionright, 1)

      this.router.navigate(['/home']);
    } catch (error: any) {
      this.loginFail = true;
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

  retired() {
    this.router.navigate(['/retired']);
  }

  checkStatus() {
    this.router.navigate(['/register/status']);
  }

  forgetPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordSearchPersonComponent, {
      width: '350px',
      data: { lang_thai: true }
    });
    dialogRef.componentInstance.confirmed.subscribe(async (res: any) => {
      this.submitForgotPassword(res);
    });
  }

  async submitForgotPassword(formData: any) {
    const forgotPassword = await lastValueFrom(
      this.uniLoginService.checkUser(formData)
    );
    if (forgotPassword?.returncode === '98') {
      this.showErrorDialog(formData);
    } else {
      localForage.setItem('uniSetNewPassword', formData).then(()=>{
        this.forgotPasswordStepTwo(formData, forgotPassword);
      })
    }
  }

  forgotPasswordStepTwo(formData: any, result: any) {
    const dialogRef = this.dialog.open(ForgotPasswordSetNewPasswordComponent, {
      width: '350px',
      data: { lang_thai: true, idcardno: result.username }
    });
    dialogRef.componentInstance.confirmed.subscribe(async (res: any) => {
      this.handleSubmitPassword(formData, res);
    });
  }

  handleSubmitPassword(formData: any, result: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `ยืนยันข้อมูล`,
        subTitle: `คุณต้องการยืนยันรหัสผ่านหรือไม่?`,
        btnLabel: 'ยืนยัน',
      },
    });
    confirmDialog.componentInstance.confirmed
      .subscribe((res) => {
        this.submitChangePassword(formData, result);
      });
  }

  async submitChangePassword(formData: any, res: any) {
    const payload = { ...formData, password: res };
    const forgotPassword = await lastValueFrom(
      this.uniLoginService.forgotPassword(payload)
    );
    if (forgotPassword) {
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
          localForage.removeItem('uniSetNewPassword');
        }
      });
    }
  }

  showErrorDialog(formData: any) {
    const dialogErrorRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `ไม่พบข้อมูลของท่านในระบบ`,
        subTitle: `กรุณาเลือกตรวจสอบอีกครั้งเพื่อตรวจสอบ
          หรือยกเลิกหากท่านไม่ต้องการทำรายการต่อ`,
        btnLabel: `ตรวจสอบอีกครั้ง`,
      },
    });
    dialogErrorRef.componentInstance.confirmed.subscribe((res: any) => {
      if (res) {
        this.submitForgotPassword(formData);
      }
    });
  }
}
