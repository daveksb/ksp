import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './self-service-thai-login.component.html',
  styleUrls: ['./self-service-thai-login.component.css'],
})
export class SelfServiceThaiLoginComponent {
  eyeIconClicked = false;

  form = this.fb.group({
    personId: [],
    password: [],
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  register() {
    this.router.navigate(['/', 'register', 'policy']);
  }

  login() {
    this.router.navigate(['/', 'license', 'request']);
  }
}
