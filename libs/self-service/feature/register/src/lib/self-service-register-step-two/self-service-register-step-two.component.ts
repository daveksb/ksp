import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormVerifyOtpComponent } from '@ksp/self-service/ui/forms';

@Component({
  selector: 'ksp-self-service-register-step-two',
  templateUrl: './self-service-register-step-two.component.html',
  styleUrls: ['./self-service-register-step-two.component.scss'],
})
export class SelfServiceRegisterStepTwoComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormVerifyOtpComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
