import { Component, OnInit } from '@angular/core';
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
import { SelfMyInfo } from '@ksp/shared/interface';
import { formatDatePayload, validatorMessages } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-register-step-three',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss'],
})
export class RegisterPasswordComponent implements OnInit {
  form = this.fb.group(
    {
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
    },
    {
      validators: [Validation.match('password', 'confirmPassword')],
    }
  );

  idCardNo = '';
  myInfo = new SelfMyInfo();
  passwordEqual = false;
  validatorMessages = validatorMessages;
  eyeIconClicked1 = false;
  eyeIconClicked2 = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.validatePassword();
    this.loadStorage();
  }

  loadStorage() {
    localForage.getItem('th-register').then((res: any) => {
      //console.log('res = ', res);
      this.idCardNo = res.idcardno;
      this.myInfo = { ...res, ...this.form.value };
      this.myInfo.idcardno = res.idcardno;
      this.myInfo.username = res.idcardno;
      this.myInfo.isactive = '1';
      this.myInfo.uniquetimestamp = res.uniquetimestamp;
      this.myInfo.usertype = '1'; // ชาวไทย
      this.myInfo.prefixth = res.prefixth;
      this.myInfo.prefixen = res.prefixen;
      this.myInfo.sex = res.sex;
    });
  }

  validatePassword() {
    this.form.controls.confirmPassword.valueChanges.subscribe((res) => {
      if (res === this.form.controls.password.value) {
        this.passwordEqual = true;
      } else {
        this.passwordEqual = false;
      }
    });
  }

  submit() {
    this.myInfo = {
      ...this.myInfo,
      ...{ password: this.form.controls.password.value },
      ...{ addressinfo: JSON.stringify([this.myInfo.addressinfo]) },
    };

    const payload = formatDatePayload(this.myInfo);

    this.myInfoService.insertMyInfo(payload).subscribe(() => {
      this.dialog.open(RegisterCompletedComponent, {
        width: '600px',
        data: {
          title: `ยินดีด้วย!`,
          subTitle: `สมัครสมาชิกของท่านเสร็จสมบูรณ์`,
          btnLabel: `เข้าสู่ระบบ`,
        },
      });
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

  get password() {
    return this.form.controls.password;
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
