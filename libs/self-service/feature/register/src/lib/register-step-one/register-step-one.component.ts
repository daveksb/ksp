import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;

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
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.getListData();
  }

  provinceChanged(evt: any) {
    const province = evt.target?.value;
    if (province) {
      this.amphurs1$ = this.addressService.getAmphurs(province);
    }
  }

  amphurChanged(evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      this.tumbols1$ = this.addressService.getTumbols(amphur);
    }
  }

  getListData() {
    this.provinces1$ = this.addressService.getProvinces();
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
