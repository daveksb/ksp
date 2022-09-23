import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpForeignDialogComponent } from '@ksp/self-service/dialog';
import localForage from 'localforage';
@Component({
  selector: 'self-service-register-foreign-step-two',
  templateUrl: './register-foreign-step-two.component.html',
  styleUrls: ['./register-foreign-step-two.component.scss'],
})
export class RegisterForeignStepTwoComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router, //private fb: FormBuilder,
    private fb: FormBuilder
  ) {}
  form = this.fb.group({
    idcardno: [],
    passportno: [],
    passportstartdate: [],
    passportenddate: [],
    visaclass: [],
    visatype: [],
    validuntill: [],
  });
  openDialog() {
    const dialogRef = this.dialog.open(VerifyOtpForeignDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      localForage.getItem('registerForeign').then((res: any) => {
        const data = { ...res, ...this.form.value };
        localForage.setItem('registerForeignr', data);
        this.nextStep();
      });
    });
  }
  nextStep() {
    localForage.setItem('registerForeignStepTwo', this.form.value);
    this.router.navigate(['/', 'register', 'en-step-3']);
  }
  loginPage() {
    this.router.navigate(['/login']);
  }

  previousPage() {
    this.router.navigate(['/register', 'step-1']);
  }
}
