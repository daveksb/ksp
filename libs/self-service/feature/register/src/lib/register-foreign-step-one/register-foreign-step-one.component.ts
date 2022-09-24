import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
import localForage from 'localforage';
import { Observable } from 'rxjs';
@Component({
  templateUrl: './register-foreign-step-one.component.html',
  styleUrls: ['./register-foreign-step-one.component.scss'],
})
export class RegisterForeignStepOneComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {}
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
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
  ngOnInit() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.countries$ = this.addressService.getCountry();
  }
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
