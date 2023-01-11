import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormMode } from '@ksp/shared/interface';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-new-foreign-user-detail',
  templateUrl: './new-foreign-user-detail.component.html',
  styleUrls: ['./new-foreign-user-detail.component.scss'],
})
export class NewForeignUserDetailComponent implements OnInit {
  nationalitys$!: Observable<any>;
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
  visaClassList$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  mode: FormMode = 'view';
  approveChoices = approveChoices;
  checkedResult: any;

  form = this.fb.group({
    teacherid: [null],
    passport: [null],

    prefixen: [null],
    firstnameen: [null],
    middlenameen: [null],
    lastnameen: [null],
    birthdate: [null],
    country: [null],
    nationality: [null],
    phone: [null],
    email: [null],

    idcardno: [null],
    passportno: [null],
    passportstartdate: [null],
    passportenddate: [null],
    visaclass: [null],
    visatype: [null],
    visaenddate: [null],
  });

  constructor(
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.countries$ = this.addressService.getCountry();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.visaClassList$ = this.generalInfoService.getVisaClass();
    this.visaTypeList$ = this.generalInfoService.getVisaType();

    this.form.disable();
  }

  cancel() {
    this.router.navigate(['self-user', 'new-user-list']);
  }
}

const approveChoices = [
  {
    name: 'อนุมัติ',
    value: 1,
  },
  {
    name: 'ไม่อนุมัติ',
    value: 0,
  },
];
