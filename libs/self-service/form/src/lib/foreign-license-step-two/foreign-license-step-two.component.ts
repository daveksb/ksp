import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralInfoService, AddressService } from '@ksp/shared/service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { nameEnPattern } from '@ksp/shared/utility';
import {
  Country,
  FileGroup,
  KspFormBaseComponent,
  Prefix,
  Province,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import moment from 'moment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
  @Input()
  set licensureInfo(value: any) {
    setTimeout(() => {
      this.form.controls.licensureInfoForm.patchValue(value);
    }, 0);
  }
  @Input() academicFiles: FileGroup[] = [];
  @Input() uniqueTimestamp!: string;
  @Input() isRenewLicense = false;
  @Input() myImage = '';
  @Input() isEditMode = true;

  prefixList$!: Observable<Prefix[]>;
  provinces1$!: Observable<Province[]>;
  district1$!: Observable<any>;
  subDistrict1$!: Observable<any>;
  provinces2$!: Observable<any>;
  district2$!: Observable<any>;
  subDistrict2$!: Observable<any>;
  nationalitys$!: Observable<any>;
  countries$!: Observable<Country[]>;
  countries2$!: Observable<Country[]>;
  age = '';

  override form = this.fb.group({
    id: [],
    passportno: [null, [Validators.required]],
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
    birthdate: [null, Validators.required],
    nationality: [null, Validators.required],
    foreignpassporttype: ['', Validators.required],
    imagefileid: [''],
    addressForm: [],
    workplaceForm: [],
    academicForm: [],
    grantionLicenseForm: [],
    licensureInfoForm: [],
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
    this.form.controls.birthdate.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value) {
          const birthDate = moment(value);
          const currentDate = moment(new Date());
          const age = Math.abs(birthDate.diff(currentDate, 'years'));
          this.age = `${age}`;
        }
      });
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

  uploadImageComplete(imageId: string) {
    this.form.patchValue({ imagefileid: imageId });
  }
}
