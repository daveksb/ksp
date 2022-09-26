import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralInfoService } from '@ksp/shared/service';
import localForage from 'localforage';
import { Observable } from 'rxjs';
@Component({
  selector: 'self-service-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.scss'],
})
export class RegisterStepOneComponent {
  nationalitys$!: Observable<any>;

  form = this.fb.group({
    prefixth: [],
    firstnameth: [],
    lastnameth: [],
    prefixen: [],
    firstnameen: [],
    lastnameen: [],
    birthdate: [],
    nationality: ['TH'],
    phone: [],
    email: [],
    address: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {
    this.nationalitys$ = this.generalInfoService.getNationality();
  }

  loginPage() {
    this.router.navigate(['/login']);
  }

  nextPage() {
    localForage.setItem('th-register', this.form.value);
    this.router.navigate(['/register', 'th-step-2']);
  }
}
