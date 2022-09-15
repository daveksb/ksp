import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordSearchPersonComponent } from '@ksp/shared/dialog';
import { SelfServiceLoginService } from './self-service-login.service';
import { setCookie } from '@ksp/shared/utility';

@Component({
  templateUrl: './self-service-thai-login.component.html',
  styleUrls: ['./self-service-thai-login.component.css'],
})
export class SelfServiceThaiLoginComponent {
  eyeIconClicked = false;

  form = this.fb.group({
    username: [],
    password: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: SelfServiceLoginService,
    public dialog: MatDialog
  ) {}

  register() {
    this.router.navigate(['/', 'landing']);
  }

  login() {
    this.loginService.validateLogin(this.form.value).subscribe((res) => {
      if (res.returnCode == 99) return;
      this.loginService.config = res;
      setCookie('userToken', res.usertoken, 1);
      // setCookie('firstNameTh', res.firstNameTh, 1);
      // setCookie('lastNameTh', res.lastNameTh, 1);
      this.router.navigate(['/', 'home']);
    });
  }

  forgot() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ForgotPasswordSearchPersonComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
