import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormVerifyPhoneComponent } from '@ksp/self-service/ui/forms';

@Component({
  selector: 'ksp-self-service-register-step-two',
  templateUrl: './self-service-register-step-two.component.html',
  styleUrls: ['./self-service-register-step-two.component.scss'],
})
export class SelfServiceRegisterStepTwoComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormVerifyPhoneComponent, {
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

  previousPage() {
    this.router.navigate(['/', 'register-1']);
  }

}
