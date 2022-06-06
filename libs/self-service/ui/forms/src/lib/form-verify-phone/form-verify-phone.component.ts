import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormVerifyOtpComponent } from '../form-verify-otp/form-verify-otp.component';

@Component({
  templateUrl: './form-verify-phone.component.html',
  styleUrls: ['./form-verify-phone.component.scss'],
})
export class FormVerifyPhoneComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(FormVerifyOtpComponent, {
      width: '600px',
    });

    /*     dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    }); */
  }
}
