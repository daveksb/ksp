import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import localForage from 'localforage';
@Component({
  selector: 'self-service-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.scss'],
})
export class RegisterStepOneComponent {
  form = this.fb.group({
    prefixth: [],
    firstnameth: [],
    lastnameth: [],
    prefixen: [],
    firstnameen: [],
    lastnameen: [],
    birthdate: [],
    nationality: [],
    phone: [],
    email: [],
    address: [],
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  loginPage() {
    this.router.navigate(['/login']);
  }

  nextPage() {
    localForage.setItem('th-register', this.form.value);
    this.router.navigate(['/register', 'th-step-2']);
  }
}
