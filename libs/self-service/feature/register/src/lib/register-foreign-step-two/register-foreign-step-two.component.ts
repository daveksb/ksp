import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  FormVerifyOtpForeignComponent,
  FormVerifyPhoneComponent,
} from '@ksp/self-service/form';

@Component({
  selector: 'ksp-register-foreign-step-two',
  templateUrl: './register-foreign-step-two.component.html',
  styleUrls: ['./register-foreign-step-two.component.scss'],
})
export class RegisterForeignStepTwoComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormVerifyOtpForeignComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  loginPage() {
    this.router.navigate(['/', 'login']);
  }

  previousPage() {
    this.router.navigate(['/', 'register', 'step-1']);
  }
}
