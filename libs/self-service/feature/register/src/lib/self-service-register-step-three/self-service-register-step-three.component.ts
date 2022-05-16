import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterCompletedComponent } from '@ksp/self-service/ui/content';

@Component({
  selector: 'ksp-self-service-register-step-three',
  templateUrl: './self-service-register-step-three.component.html',
  styleUrls: ['./self-service-register-step-three.component.scss'],
})
export class SelfServiceRegisterStepThreeComponent {
  //  constructor(public dialog: MatDialog, public selfRef: MatDialogRef<any>) {}
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog() {
    const dialogRef = this.dialog.open(RegisterCompletedComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  loginPage() {
    this.router.navigate(['/', 'login']);
  }
}
