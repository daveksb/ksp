import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ConfirmDialogComponent,
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
    console.log('forgot = ');
    this.dialog.closeAll();
    const dialog = this.dialog.open(ForgotPasswordSearchPersonComponent);
    dialog.componentInstance.confirmed
      .pipe(
        //tap((i) => console.log('data = ', i)),
        switchMap((res) => this.myInfoService.forgetPassword(res))
        //switchMap((res) => this.myInfoService.resetPassword(res))
      )
      .subscribe((res) => {
        console.log('res = ', res);
        if (res.returncode === '1') {
          const dialogRef = this.dialog.open(
            ForgotPasswordSetNewPasswordComponent
          );
        } else {
          this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: `ไม่พบข้อมูลของท่านภายในระบบ`,
              isDanger: true,
              btnLabel: 'ตรวจสอบอีกครั้ง',
            },
          });
        }
      });
  }

  /*     /*     const dialogRef = this.dialog.open(ForgotPasswordSetNewPasswordComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.confirmed.subscribe((password) => {
      this.confirmed.emit({ ...this.form.value, password });
    }); */
}
