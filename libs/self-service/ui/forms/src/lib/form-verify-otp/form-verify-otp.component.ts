import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  templateUrl: './form-verify-otp.component.html',
  styleUrls: ['./form-verify-otp.component.scss'],
})
export class FormVerifyOtpComponent {
  constructor(
    private router: Router,
    public selfRef: MatDialogRef<FormVerifyOtpComponent>
  ) {}

  nextStep() {
    // close current dialog before open the new one
    this.selfRef.close();

    this.router.navigate(['/', 'register-3']);
  }
}
