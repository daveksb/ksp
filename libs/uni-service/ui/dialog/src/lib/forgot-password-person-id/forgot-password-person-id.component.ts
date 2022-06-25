import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordSetNewPasswordComponent } from '../forgot-password-set-new-password/forgot-password-set-new-password.component';

@Component({
  templateUrl: './forgot-password-person-id.component.html',
  styleUrls: ['./forgot-password-person-id.component.scss'],
})
export class ForgotPasswordPersonIdComponent {
  constructor(public dialog: MatDialog, private dialogRef: MatDialog) {}

  cancel() {
    this.dialogRef.closeAll();
  }

  nextStep() {
    this.dialogRef.closeAll();
    const dialogRef = this.dialog.open(ForgotPasswordSetNewPasswordComponent, {
      height: '400px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
