import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordPersonIdComponent } from '../forgot-password-person-id/forgot-password-person-id.component';

@Component({
  selector: 'ksp-forgot-password-not-found',
  templateUrl: './forgot-password-not-found.component.html',
  styleUrls: ['./forgot-password-not-found.component.scss'],
})
export class ForgotPasswordNotFoundComponent {
  constructor(public dialog: MatDialog) {}

  cancel() {
    this.dialog.closeAll();
  }

  nextStep() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ForgotPasswordPersonIdComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
