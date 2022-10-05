import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';
import localForage from 'localforage';
import { MyInfoService } from '@ksp/shared/service';
import { SelfMyInfo } from '@ksp/shared/interface';
import { validatorMessages } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-register-step-three',
  templateUrl: './register-step-three.component.html',
  styleUrls: ['./register-step-three.component.scss'],
})
export class RegisterStepThreeComponent implements OnInit {
  form = this.fb.group({
    password: [null, Validators.required],
    confirmPassword: [],
  });

  idCardNo = '';
  payload!: SelfMyInfo;
  passwordEqual = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.form.controls.confirmPassword.valueChanges.subscribe((res) => {
      if (res === this.form.controls.password.value) {
        this.passwordEqual = true;
      } else {
        this.passwordEqual = false;
      }
    });

    localForage.getItem('th-register').then((res: any) => {
      this.idCardNo = res.idcardno;
      this.payload = { ...res, ...this.form.value };
      this.payload.username = res.idcardno;
      this.payload.isactive = '1';
      this.payload.uniquetimestamp = res.uniquetimestamp;
      this.payload.usertype = '1'; // ชาวไทย
    });
  }

  submit() {
    this.payload = {
      ...this.payload,
      ...{ password: this.form.controls.password.value },
      ...{ addressinfo: JSON.stringify([this.payload.addressinfo]) },
    };

    this.myInfoService.insertMyInfo(this.payload).subscribe((res) => {
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
}
