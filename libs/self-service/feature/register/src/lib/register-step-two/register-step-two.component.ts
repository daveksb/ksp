import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyPhoneDialogComponent } from '@ksp/self-service/dialog';
import { idCardPattern, validatorMessages } from '@ksp/shared/utility';
import localForage from 'localforage';

@Component({
  selector: 'self-service-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.scss'],
})
export class RegisterStepTwoComponent {
  validatorMessages = validatorMessages;

  form = this.fb.group({
    idcardno: [null, [Validators.required, Validators.pattern(idCardPattern)]],
    idcardbackno: [null, [Validators.required]],
    //idcardimage: [],
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(VerifyPhoneDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
      localForage.getItem('th-register').then((res: any) => {
        const data = { ...res, ...this.form.value };
        localForage.setItem('th-register', data);
      });
    });
  }

  loginPage() {
    this.router.navigate(['/login']);
  }

  previousPage() {
    this.router.navigate(['/register', 'th-step-1']);
  }

  get idCardNo() {
    return this.form.controls.idcardno;
  }
}
