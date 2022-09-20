import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ConfirmDialogComponent,
  ForgotPasswordSearchPersonComponent,
} from '@ksp/shared/dialog';
import { LoginFormComponent } from '@ksp/shared/form/login';
import { ReactiveFormsModule } from '@angular/forms';
import { UniLoginService } from './uni-login.service';
import { lastValueFrom } from 'rxjs';
import { setCookie } from '@ksp/shared/utility';

@Component({
  selector: 'uni-service-login',
  templateUrl: './uni-login.component.html',
  styleUrls: ['./uni-login.component.scss'],
  standalone: true,
  imports: [CommonModule, LoginFormComponent, ReactiveFormsModule],
})
export class UniLoginComponent {
  form = this.fb.group({
    user: {},
  });
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniLoginService: UniLoginService
  ) {}
  showWarningDialog(title: string) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: title,
        isDanger: true,
      },
    });
  }
  async login() {
    try {
      const res = await lastValueFrom<any>(
        this.uniLoginService.validateLogin(this.form?.value?.user)
      );
      if (res?.returncode == 99)
        return this.showWarningDialog(
          res?.returnmessage || 'เข้าสู่ระบบไม่สำเร็จ'
        );
      setCookie('userToken', res?.usertoken || '', 1);
      setCookie('firstNameTh', res?.firstnameth || '', 1);
      setCookie('lastNameTh', res?.lastnameth || '', 1);
      setCookie('uniId', res?.uniid || '', 1);
      setCookie('uniType', res?.unitype || '', 1);

      this.router.navigate(['/home']);
    } catch (error: any) {
      this.showWarningDialog(error?.message);
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

  retired() {
    this.router.navigate(['/retired']);
  }

  forgetPassword() {
    this.dialog.open(ForgotPasswordSearchPersonComponent, {
      width: '350px',
    });
  }
}
