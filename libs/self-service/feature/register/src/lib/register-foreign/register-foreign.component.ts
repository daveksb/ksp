import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import localForage from 'localforage';
@Component({
  //selector: 'ksp-register-foreign',
  templateUrl: './register-foreign.component.html',
  styleUrls: ['./register-foreign.component.scss'],
})
export class RegisterForeignComponent {
  form = this.fb.group({
    kuruspano: [null, [Validators.required]],
    passportno: [null, [Validators.required]],
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  submit() {
    localForage.setItem('registerForeigner', this.form.value);
    this.router.navigate(['/register', 'en-step-1']);
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
