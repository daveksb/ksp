import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
import { formatDatePayload } from '@ksp/shared/utility';
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

  nationalitys$!: Observable<any>;
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
  form = this.fb.group({
    prefixen: [null, [Validators.required]],
    firstnameen: [null, [Validators.required]],
    middlenameen: [null],
    lastnameen: [null],
    birthdate: [],
    country: [],
    nationality: [],
    phone: [null, [Validators.required]],
    email: [],
  });

  ngOnInit() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.countries$ = this.addressService.getCountry();
    this.nationalitys$ = this.generalInfoService.getNationality();
    localForage.getItem('registerForeigner').then((res: any) => {
      //console.log('pv form = ', res);
      const payload = {
        ...res,
        ...{ phone: res.contactphone, country: Number(res.country) },
      };
      this.form.patchValue(formatDatePayload(payload));

      const data = { ...res, ...this.form.value };
      localForage.setItem('registerForeigner', data);
    });
  }

  next() {
    this.router.navigate(['/register', 'en-step-2']);
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
