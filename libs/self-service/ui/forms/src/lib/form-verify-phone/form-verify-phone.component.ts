import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormVerifyOtpComponent } from '../form-verify-otp/form-verify-otp.component';

@Component({
  templateUrl: './form-verify-phone.component.html',
  styleUrls: ['./form-verify-phone.component.scss'],
})
export class FormVerifyPhoneComponent {
  constructor(
    public dialog: MatDialog,

  ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  openDialog() {
    // close current dialog before open the new one
    this.dialog.closeAll();

    const dialogRef = this.dialog.open(FormVerifyOtpComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
