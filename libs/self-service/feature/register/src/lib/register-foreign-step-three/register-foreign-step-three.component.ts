import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { MyInfoService } from '@ksp/shared/service';
import { switchMap, EMPTY } from 'rxjs';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';
import localForage from 'localforage';
import { SelfMyInfo } from '@ksp/shared/interface';
import { v4 as uuidv4 } from 'uuid';
import { validatorMessages } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-register-foreign-step-three',
  templateUrl: './register-foreign-step-three.component.html',
  styleUrls: ['./register-foreign-step-three.component.scss'],
})
export class RegisterForeignStepThreeComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}

  savingData: any;
  passpoerNo = '';

  passwordEqual = false;
  validatorMessages = validatorMessages;

  eyeIconClicked1 = false;
  eyeIconClicked2 = false;

  form = this.fb.group(
    {
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
    },
    {
      validators: [Validation.match('password', 'confirmPassword')],
    }
  );

  loginPage() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    localForage.getItem('registerForeigner').then((res: any) => {
      this.savingData = res;
      this.passpoerNo = res.passportno;
      console.log('xxx = ', this.passpoerNo);
    });
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `Confirm?`,
        subTitle: `You want to save this information`,
        btnLabel: 'Submit',
        cancelBtnLabel: 'Cancel',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const payload: SelfMyInfo = {
              ...this.savingData,
              ...this.form.value,
            };
            payload.usertype = '2'; // ครูต่างชาติ
            payload.isactive = '1';
            payload.uniquetimestamp = uuidv4();

            return this.myInfoService.insertMyInfo(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.onCompleted();
        }
      });
  }

  onCompleted() {
    localForage.removeItem('registerUserForm');
    this.dialog.open(RegisterCompletedComponent, {
      width: '600px',
      data: {
        title: `Success`,
        subTitle: `Register Successfully`,
        btnLabel: `Login`,
      },
    });
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
