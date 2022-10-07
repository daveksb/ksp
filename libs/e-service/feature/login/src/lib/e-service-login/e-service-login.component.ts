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
export class EServiceLoginComponent implements OnInit {
  loginFail = false;

  form = this.fb.group({
    user: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: EServiceLoginService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      this.loginFail = false;
    });
  }

  login() {
    this.loginService.validateLogin(this.form.value.user).subscribe((res) => {
      if (res.returncode == 99) {
        this.loginFail = true;
        return;
      }
      this.loginService.config = res;

      setCookie('userToken', res.usertoken, 1);
      setCookie('firstNameTh', res.firstnameth, 1);
      setCookie('lastNameTh', res.lastnameth, 1);

      this.router.navigate(['/landing']);
    });
  }
}
