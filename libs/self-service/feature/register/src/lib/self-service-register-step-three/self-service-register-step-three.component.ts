import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterCompletedComponent } from '@ksp/self-service/ui/content';

@Component({
  selector: 'ksp-self-service-register-step-three',
  templateUrl: './self-service-register-step-three.component.html',
  styleUrls: ['./self-service-register-step-three.component.scss'],
})
export class SelfServiceRegisterStepThreeComponent {
  //  constructor(public dialog: MatDialog, public selfRef: MatDialogRef<any>) {}
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(RegisterCompletedComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
