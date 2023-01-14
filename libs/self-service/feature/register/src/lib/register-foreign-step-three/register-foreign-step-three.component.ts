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
import { SelfRequestService } from '@ksp/shared/service';
import { switchMap, EMPTY } from 'rxjs';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';
import localForage from 'localforage';
import { KspRequest, SelfMyInfo } from '@ksp/shared/interface';
import { v4 as uuidv4 } from 'uuid';
import { formatDatePayload, validatorMessages } from '@ksp/shared/utility';

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
    private request: SelfRequestService
  ) {}

  savingData: any;
  passportNo = '';
  passwordEqual = false;
  validatorMessages = validatorMessages;
  eyeIconClicked1 = false;
  eyeIconClicked2 = false;

  form = this.fb.group(
    {
      //username: [null, Validators.required],
      username: [null],
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
      this.passportNo = res.passportno;
      //console.log('form = ', res);
    });
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
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
            const form: SelfMyInfo = {
              ...this.savingData,
              ...this.form.value,
            };
            //console.log('form = ', form);
            /*
            payload.usertype = '2'; // ครูต่างชาติ
            payload.isactive = '1';
            payload.uniquetimestamp = uuidv4();
            return this.myInfoService.insertMyInfo(payload); */
            const req = new KspRequest();
            req.isforeign = '1';
            req.ref1 = '1';
            req.ref2 = '45';
            req.ref3 = '5';
            req.systemtype = '1';
            req.requesttype = '45';
            req.careertype = '5';
            req.process = `1`;
            req.status = `1`;
            req.prefixen = form.prefixen;
            req.firstnameen = form.firstnameen;
            req.middlenameen = form.middlenameen;
            req.lastnameen = form.lastnameen;
            req.birthdate = form.birthdate;
            req.country = form.country;
            req.nationality = form.nationality;
            req.contactphone = form.phone;
            req.email = form.email;
            req.kuruspano = form.kuruspano;
            req.passportno = form.passportno;
            req.passportstartdate = form.passportstartdate;
            req.passportenddate = form.passportenddate;
            req.visaclass = form.visaclass;
            req.visatype = form.visatype;
            req.visaexpiredate = form.visaenddate;
            req.uniqueno = form.password;

            const {
              id,
              requestid,
              groupno,
              lastupdatesystemtype,
              listno,
              requestdate,
              requestno,
              requesttable,
              ...payload
            } = req;
            return this.request.createRequestNoToken(payload);
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
        subTitle: `Please check your application status via email`,
        btnLabel: `Back to homepage`,
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
