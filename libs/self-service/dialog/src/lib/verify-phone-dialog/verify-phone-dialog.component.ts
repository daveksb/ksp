import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VerifyOtpDialogComponent } from '../verify-otp-dialog/verify-otp-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { phonePattern, validatorMessages } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-verify-phone-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './verify-phone-dialog.component.html',
  styleUrls: ['./verify-phone-dialog.component.scss'],
})
export class VerifyPhoneDialogComponent {
  form = this.fb.group({
    phone: [null, [Validators.required, Validators.pattern(phonePattern)]],
  });

  validatorMessages = validatorMessages;
  constructor(public dialog: MatDialog, private fb: FormBuilder) {}

  openDialog() {
    this.dialog.open(VerifyOtpDialogComponent, {
      width: '600px',
    });
  }

  get phone() {
    return this.form.controls.phone;
  }
}
