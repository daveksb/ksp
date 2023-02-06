import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ForgotPasswordSearchPersonComponent,
  ForgotPasswordSetNewPasswordComponent,
} from '@ksp/shared/dialog';
import { SelfServiceLoginService } from './self-service-login.service';
import { setCookie } from '@ksp/shared/utility';
import { MyInfoService } from '@ksp/shared/service';
import { switchMap, tap } from 'rxjs';
import localForage from 'localforage';
@Component({
  templateUrl: './self-service-thai-login.component.html',
  styleUrls: ['./self-service-thai-login.component.css'],
})
export class SelfServiceThaiLoginComponent {
  eyeIconClicked = false;
  loginFail = false;
  lang_thai = true;

  form = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: SelfServiceLoginService,
    public dialog: MatDialog,
    private myInfoService: MyInfoService
  ) {}

  register() {
    this.router.navigate(['/landing']);
  }

  login() {
    this.loginFail = false;
    this.loginService.validateLogin(this.form.value).subscribe((res) => {
      if (res && res.id && res.usertoken) {
        localForage.setItem('my-info', res);
        setCookie('userToken', res.usertoken, 1);
        setCookie('userId', res.id, 1);
        setCookie('idCardNo', `${res.idcardno}`, 1);
        this.router.navigate(['/home']);
      } else if (res.returncode === '99') {
        this.loginFail = true;
        this.form.reset();
      } else {
        return;
      }
    });
    this.loginFail = false;
  }

  forgot() {
    let formData: any = null;
    const dialog = this.dialog.open(ForgotPasswordSearchPersonComponent, {
      data: {
        lang_thai: this.lang_thai,
      },
    });
    dialog.componentInstance.confirmed
      .pipe(
        tap((i) => (formData = i)),
        switchMap((res) => {
          dialog.componentInstance.data = {
            notfound: false,
            lang_thai: this.lang_thai,
          };
          return this.myInfoService.forgetPassword(res);
        })
      )
      .subscribe((res) => {
        if (res.returncode === '1') {
          this.showForgetDialog(formData, this.lang_thai);
        } else {
          dialog.componentInstance.data = {
            notfound: true,
            lang_thai: this.lang_thai,
          };
        }
      });
  }

  showForgetDialog(formData: any, lang: any) {
    const dialogRef = this.dialog.open(ForgotPasswordSetNewPasswordComponent, {
      data: formData,
    });

    dialogRef.componentInstance.confirmed.subscribe((password) => {
      const payload = {
        ...formData,
        password,
      };
      this.myInfoService.resetPassword(payload).subscribe(() => {
        this.dialog.open(CompleteDialogComponent, {
          data: {
            header: lang ? `ทำรายการสำเร็จ` : `Completed !`,
            subContent: lang
              ? `ระบบได้ทำการเปลี่ยนรหัสผ่านให้ท่านเรียบร้อยแล้ว
            กรุณาเข้าสู่ระบบใหม่อีกครั้ง`
              : `The system has changed your password.
            Please login again.`,
            btnLabel: lang ? `เข้าสู่ระบบ` : `Login`,
          },
        });
      });
    });
  }
}
