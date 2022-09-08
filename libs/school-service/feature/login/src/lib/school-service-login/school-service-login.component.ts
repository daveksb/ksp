import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolServiceFeatureLoginService } from '../school-service-feature-login.service';

@Component({
  selector: 'school-service-login',
  templateUrl: './school-service-login.component.html',
  styleUrls: ['./school-service-login.component.scss'],
})
export class SchoolServiceLoginComponent {
  form = this.fb.group({
    user: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private schoolServiceFeatureLoginService: SchoolServiceFeatureLoginService
  ) {}

  login() {
    this.schoolServiceFeatureLoginService
      .validateLogin(this.form.value.user)
      .subscribe((res) => {
        if (res?.returnCode !== 99) {
          console.log(res);
          this.schoolServiceFeatureLoginService.setCookie(
            'schUserToken',
            res.schUserToken,
            1
          );
          this.router.navigate(['/temp-license', 'list']);
        } else {
          console.log('CANNOT LOGIN');
        }
      });
  }

  register() {
    this.router.navigate(['/register', 'current-user']);
  }

  forgetPassword() {
    this.router.navigate(['/forget-password', 'person-id']);
  }

  retired() {
    this.router.navigate(['/', 'retired-user', 'search']);
  }
}
