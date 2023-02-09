import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { setCookie } from '@ksp/shared/utility';
import { EServiceLoginService } from './e-service-login.service';

@Component({
  selector: 'ksp-e-service-login',
  templateUrl: './e-service-login.component.html',
  styleUrls: ['./e-service-login.component.scss'],
})
export class EServiceLoginComponent {
  loginFail = false;

  form = this.fb.group({
    user: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: EServiceLoginService
  ) {}

  login() {
    this.loginFail = false;
    this.loginService.validateLogin(this.form.value.user).subscribe((res) => {
      if (res.returncode == 99) {
        this.loginFail = true;
        this.form.reset();
        return;
      }
      this.loginService.config = res;
      //console.log('res hh = ', res);
      setCookie('userToken', res.usertoken, 1);
      setCookie('firstNameTh', res.firstnameth, 1);
      setCookie('lastNameTh', res.lastnameth, 1);
      setCookie('userId', res.id, 1);
      setCookie('permissionRight', res.permissionright, 1); //1 = ส่วนกลาง, 2 = ส่วนภูมิภาค

      this.router.navigate(['/landing']);
    });
  }
}
