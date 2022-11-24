import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Title } from '@angular/platform-browser';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { validatorMessages } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-forgot-password-set-new-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password-set-new-password.component.html',
  styleUrls: ['./forgot-password-set-new-password.component.scss'],
})
export class ForgotPasswordSetNewPasswordComponent {
  form = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [Validation.match('newPassword', 'confirmPassword')],
    }
  );

  @Output() confirmed = new EventEmitter<any>();
  validatorMessages = validatorMessages;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {}

  cancel() {
    this.dialog.closeAll();
  }

  nextStep() {
    this.dialog.closeAll();
    this.confirmed.emit(this.form.value.newPassword);
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
      !this.form.controls.confirmPassword.valid ||
      !this.form.controls.newPassword.valid
    );
  }

  get password() {
    return this.form.controls.newPassword;
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
