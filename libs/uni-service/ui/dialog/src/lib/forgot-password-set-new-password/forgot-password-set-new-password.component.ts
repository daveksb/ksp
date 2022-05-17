import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordNotFoundComponent } from '../forgot-password-not-found/forgot-password-not-found.component';

@Component({
  selector: 'ksp-forgot-password-set-new-password',
  templateUrl: './forgot-password-set-new-password.component.html',
  styleUrls: ['./forgot-password-set-new-password.component.scss'],
})
export class ForgotPasswordSetNewPasswordComponent {
  constructor(public dialog: MatDialog) {}

  cancel() {
    this.dialog.closeAll();
  }

  nextStep() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ForgotPasswordNotFoundComponent, {
      height: '200px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
