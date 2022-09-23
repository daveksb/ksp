import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import localForage from 'localforage';
@Component({
  //  selector: 'ksp-register-foreign',
  templateUrl: './register-foreign.component.html',
  styleUrls: ['./register-foreign.component.scss'],
})
export class RegisterForeignComponent {
  form = this.fb.group({
    idcardno: [],
    passportno: [],
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  submit() {
    localForage.setItem('registerForeign', this.form.value);
    this.router.navigate(['/register', 'en-step-1']);
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
