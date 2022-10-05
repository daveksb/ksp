import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
import localForage from 'localforage';
import { Observable } from 'rxjs';
@Component({
  selector: 'self-service-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.scss'],
})
export class RegisterStepOneComponent implements OnInit {
  nationalitys$!: Observable<any>;
  provinces$!: Observable<any>;
  amphurs$!: Observable<any>;
  tumbols$!: Observable<any>;

  form = this.fb.group({
    prefixth: [null, Validators.required],
    firstnameth: [null, Validators.required],
    lastnameth: [null, Validators.required],
    prefixen: [null, Validators.required],
    firstnameen: [null, Validators.required],
    lastnameen: [null, Validators.required],
    birthdate: [null, Validators.required],
    nationality: ['TH', Validators.required],
    phone: [null, Validators.required],
    email: [null, Validators.required],
    address: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.provinces$ = this.addressService.getProvinces();
  }

  loginPage() {
    this.router.navigate(['/login']);
  }

  nextPage() {
    localForage.setItem('th-register', this.form.value);
    this.router.navigate(['/register', 'th-step-2']);
  }

  provinceChanged(evt: any) {
    const province = evt.target?.value;
    if (province) {
      console.log('pv vhange = ', evt);
      this.amphurs$ = this.addressService.getAmphurs(province);
    }
  }

  amphurChanged(evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      this.tumbols$ = this.addressService.getTumbols(amphur);
    }
  }
}
