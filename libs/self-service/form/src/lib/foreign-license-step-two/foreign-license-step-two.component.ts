import { Component, Input, OnInit } from '@angular/core';
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
  @Input()
  set userInfo(value: any) {
    setTimeout(() => {
      this.form.patchValue(value);
    }, 0);
  }
  @Input()
  set addressInfo(value: any) {
    setTimeout(() => {
      if (value) {
        this.district1$ = this.addressService.getAmphurs(value.province);
        this.subDistrict1$ = this.addressService.getTumbols(value.amphur);
        this.form.controls.addressForm.patchValue(value);
      }
    }, 0);
  }
  @Input()
  set workplaceInfo(value: any) {
    setTimeout(() => {
      if (value) {
        this.district2$ = this.addressService.getAmphurs(
          value.addressForm.province
        );
        this.subDistrict2$ = this.addressService.getTumbols(
          value.addressForm.amphur
        );
        this.form.controls.workplaceForm.patchValue(value);
      }
    }, 0);
  }
  @Input()
  set eduInfo(value: any) {
    setTimeout(() => {
      this.form.controls.academicForm.patchValue(value);
    }, 0);
  }
  @Input()
  set grantionTeachingInfo(value: any) {
    setTimeout(() => {
      this.form.controls.grantionLicenseForm.patchValue(value);
    }, 0);
  }
  @Input() academicFiles: any[] = [];
  @Input() uniqueTimestamp!: string;

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
    addressForm: [],
    workplaceForm: [],
    academicForm: [],
    grantionLicenseForm: [],
  });

  constructor(
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
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
    // this.getMyInfo();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.countries$ = this.addressService.getCountry();
    this.countries2$ = this.countries$;
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
