import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GeneralInfoService,
  AddressService,
  MyInfoService,
} from '@ksp/shared/service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { nameEnPattern, passportPattern } from '@ksp/shared/utility';
import { parseJson } from '@ksp/shared/utility';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-foreign-license-step-two',
  templateUrl: './foreign-license-step-two.component.html',
  styleUrls: ['./foreign-license-step-two.component.scss'],
  providers: providerFactory(ForeignLicenseStepTwoComponent),
})
export class ForeignLicenseStepTwoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  prefixList$!: Observable<any>;
  provinces1$!: Observable<any>;
  district1$!: Observable<any>;
  subDistrict1$!: Observable<any>;
  provinces2$!: Observable<any>;
  district2$!: Observable<any>;
  subDistrict2$!: Observable<any>;
  nationalitys$!: Observable<any>;
  countries$!: Observable<any>;
  countries2$!: Observable<any>;

  academicFiles = [
    {
      name: `1. Achelor's degree`,
      fileId: '',
    },
  ];

  override form = this.fb.group({
    id: [],
    passportno: [
      null,
      [Validators.required, Validators.pattern(passportPattern)],
    ],
    prefixen: [null, Validators.required],
    firstnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    middlenameen: [null],
    lastnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    sex: [null, Validators.required],
    birthdate: [null, Validators.required],
    nationality: [null],
    addresForm: [],
    workplaceForm: [],
    academicForm: [],
    grantionLicenseForm: [],
  });

  constructor(
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private myInfoService: MyInfoService,
    private fb: FormBuilder
  ) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.getListData();
    this.getMyInfo();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.countries$ = this.addressService.getCountry();
    this.countries2$ = this.countries$;
  }

  getMyInfo() {
    this.myInfoService.getMyInfo().subscribe((res) => {
      console.log(res);
      this.patchUserInfo(res);
      this.patchAddress(parseJson(res.addressinfo), res.phone, res.email);
      if (res.schooladdrinfo) {
        this.patchWorkplace(parseJson(res.schooladdrinfo));
      }
    });
  }

  patchUserInfo(data: any) {
    const {
      birthdate,
      firstnameen,
      lastnameen,
      prefixen,
      id,
      middlenameen,
      passportno,
      nationality,
    } = data;
    const patchData = {
      birthdate: birthdate.split('T')[0],
      firstnameen,
      lastnameen,
      prefixen,
      id,
      middlenameen,
      passportno,
      nationality,
    } as any;
    // this.patchUserInfoForm(patchData);
    this.form.patchValue({
      ...patchData,
    });
  }

  patchAddress(addrs: any[], phone: any, email: any) {
    if (addrs && addrs.length) {
      const addr = addrs[0];
      this.district1$ = this.addressService.getAmphurs(addr.province);
      this.subDistrict1$ = this.addressService.getTumbols(addr.amphur);
      this.form.controls.addresForm.patchValue({
        ...addr,
        phone,
        email,
      });
    }
  }

  patchWorkplace(data: any) {
    this.district2$ = this.addressService.getAmphurs(data.province);
    this.subDistrict2$ = this.addressService.getTumbols(data.district);
    this.form.controls.workplaceForm.patchValue({
      addressName: data.addressName,
      addressForm: {
        houseNo: data.houseNumber,
        alley: data.lane,
        road: data.road,
        postcode: data.zipCode,
        province: data.province,
        tumbol: data.subDistrict,
        amphur: data.district,
      },
    } as any);
  }

  provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.district1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.district2$ = this.addressService.getAmphurs(province);
      }
    }
  }

  districtChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.subDistrict1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.subDistrict2$ = this.addressService.getTumbols(amphur);
      }
    }
  }
}
