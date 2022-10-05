import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';
import localForage from 'localforage';
import { MyInfoService } from '@ksp/shared/service';
import { v4 as uuidv4 } from 'uuid';
import { SelfMyInfo } from '@ksp/shared/interface';
import { validatorMessages } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-register-step-three',
  templateUrl: './register-step-three.component.html',
  styleUrls: ['./register-step-three.component.scss'],
})
export class RegisterStepThreeComponent {
  form = this.fb.group(
    {
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    },
    {
      validators: [Validation.match('password', 'confirmPassword')],
    }
  );

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}

  submit() {
    localForage.getItem('th-register').then((res: any) => {
      const payload: SelfMyInfo = { ...res, ...this.form.value };
      payload.username = res.idcardno;
      payload.isactive = '1';
      payload.uniquetimestamp = uuidv4();
      payload.usertype = '1'; // ชาวไทย

      this.myInfoService.insertMyInfo(payload).subscribe((res) => {
        //console.log('insert = ', res);
      });
    });

    this.dialog.open(RegisterCompletedComponent, {
      width: '600px',
      data: {
        title: `ยินดีด้วย!`,
        subTitle: `สมัครสมาชิกของท่านเสร็จสมบูรณ์`,
        btnLabel: `เข้าสู่ระบบ`,
      },
    });
  }

  loginPage() {
    this.router.navigate(['/login']);
  }

  get confirmPasswordError() {
    const errors = this.form.controls.confirmPassword.errors as any;
    if (
      (this.form.controls.confirmPassword.dirty ||
        this.form.controls.confirmPassword.touched) &&
      errors?.matching
    )
      return validatorMessages.passwordNotMatching;
    return null;
  }
  get disabledSubmit() {
    return (
      !this.form.controls.password.valid ||
      !this.form.controls.confirmPassword.valid
    );
  }
}

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
