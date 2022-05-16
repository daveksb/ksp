import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  templateUrl: './form-verify-otp.component.html',
  styleUrls: ['./form-verify-otp.component.scss'],
})
export class FormVerifyOtpComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,

  ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  nextStep() {
    // close current dialog before open the new one
    this.dialog.closeAll();

    this.router.navigate(['/', 'register-3']);
  }
}
