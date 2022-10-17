import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { setCookie } from '@ksp/shared/utility';
import { SchoolServiceFeatureLoginService } from '../school-service-feature-login.service';
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'school-service-login',
  templateUrl: './school-service-login.component.html',
  styleUrls: ['./school-service-login.component.scss'],
})
export class SchoolServiceLoginComponent implements OnInit {
  loginFail = false;

  form = this.fb.group({
    login: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private schoolServiceFeatureLoginService: SchoolServiceFeatureLoginService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.loginFail = false;
    });
  }

  login() {
    const payload: any = this.form.controls.login.value;
    payload.password = CryptoJs.SHA256(`${payload.password}`).toString();

    this.schoolServiceFeatureLoginService
      .validateLogin(payload)
      .subscribe((res) => {
        if (res.returnCode == 99) {
          this.loginFail = true;
          return;
        }

        this.schoolServiceFeatureLoginService.config = res;
        setCookie('userToken', res.schUserToken, 1);
        setCookie('firstNameTh', res.firstNameTh, 1);
        setCookie('lastNameTh', res.lastNameTh, 1);
        setCookie('schoolId', res.schoolId, 1);
        this.router.navigate(['/temp-license', 'list']);
      });
  }

  register() {
    this.router.navigate(['/register', 'current-user']);
  }

  forgetPassword() {
    this.router.navigate(['/forget-password', 'person-id']);
  }

  retired() {
    this.router.navigate(['/retired-user', 'search']);
  }
}
