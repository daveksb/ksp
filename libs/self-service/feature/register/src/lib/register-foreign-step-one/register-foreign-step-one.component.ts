import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import localForage from 'localforage';
@Component({
  templateUrl: './register-foreign-step-one.component.html',
  styleUrls: ['./register-foreign-step-one.component.scss'],
})
export class RegisterForeignStepOneComponent {
  constructor(private router: Router, private fb: FormBuilder) {}
  form = this.fb.group({
    prefixen: [],
    firstnameen: [],
    middlenameen: [],
    lastnameen: [],
    birthdate: [],
    country: [],
    nationality: [],
    phone: [],
    email: [],
  });

  next() {
    localForage.getItem('registerForeign').then((res: any) => {
      const data = { ...res, ...this.form.value };
      console.log(data);
      localForage.setItem('registerForeigner', data);
      this.router.navigate(['/register', 'en-step-2']);
    });
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
