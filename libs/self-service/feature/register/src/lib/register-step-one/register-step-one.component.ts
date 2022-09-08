import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'self-service-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.scss'],
})
export class RegisterStepOneComponent {
  form = this.fb.group({
    prefixTh: [],
    nameTh: [],
    lastnameTh: [],
    prefixEng: [],
    nameEng: [],
    lastnameEng: [],
    birthDate: [],
    nationality: [],
    phone: [],
    email: [],
    address: [],
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  loginPage() {
    this.router.navigate(['/', 'login']);
  }

  nextPage() {
    this.router.navigate(['/', 'register', 'th-step-2']);
  }
}
