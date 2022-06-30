import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-login',
  templateUrl: './school-service-login.component.html',
  styleUrls: ['./school-service-login.component.scss'],
})
export class SchoolServiceLoginComponent {
  eyeIconClicked = false;

  form = this.fb.group({
    username: [],
    password: [],
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  login() {
    this.router.navigate(['/temp-license', 'list']);
  }

  register() {
    this.router.navigate(['/register', 'current-user']);
  }

  forgetPassword() {
    this.router.navigate(['/forget-password', 'person-id']);
  }
}
