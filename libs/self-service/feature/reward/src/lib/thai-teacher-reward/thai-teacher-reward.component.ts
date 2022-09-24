import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { AddressService } from '@ksp/shared/service';
import {
  createDefaultUserInfoForm,
  providerFactory,
} from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-thai-teacher-reward',
  templateUrl: './thai-teacher-reward.component.html',
  styleUrls: ['./thai-teacher-reward.component.scss'],
  providers: providerFactory(ThaiTeacherRewardComponent),
})
export class ThaiTeacherRewardComponent
  extends KspFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;
  rewardFiles = ['1. รางวัลอื่นและประกาศเกียรติคุณ'];
  @Input()
  set userInfo(value: any) {
    setTimeout(() => {
      this.form.controls.userInfo.patchValue(value);
    }, 0);
  }
  @Input()
  set addressInfo(value: any) {
    setTimeout(() => {
      if (value) {
        this.amphurs1$ = this.addressService.getAmphurs(value.province);
        this.tumbols1$ = this.addressService.getTumbols(value.amphur);
        this.form.controls.addressInfo.patchValue(value);
      }
    }, 0);
  }
  @Input()
  set workplaceInfo(value: any) {
    setTimeout(() => {
      if (value) {
        this.amphurs2$ = this.addressService.getAmphurs(value.province);
        this.tumbols2$ = this.addressService.getTumbols(value.district);
        this.form.controls.workplace.patchValue(value);
      }
    }, 0);
  }
  @Input() prefixList: any[] = [];
  @Input() bureaus: any[] = [];

  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  provinces3$!: Observable<any>;
  amphurs3$!: Observable<any>;
  tumbols3$!: Observable<any>;
  provinces4$!: Observable<any>;
  amphurs4$!: Observable<any>;
  tumbols4$!: Observable<any>;

  //public userInfo!: any;

  override form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    workplace: [],
    rewardTeacherInfo: [],
    eduInfo: [],
    hiringInfo: [],
    teachingInfo: [],
    phone: [],
    fax: [],
    email: [],
    website: [],
  });

  constructor(private fb: FormBuilder, private addressService: AddressService) {
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
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.provinces3$ = this.provinces1$;
    this.provinces4$ = this.provinces1$;
  }

  provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      } else if (addrType === 3) {
        this.amphurs3$ = this.addressService.getAmphurs(province);
      } else if (addrType === 4) {
        this.amphurs4$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 3) {
        this.tumbols3$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 4) {
        this.tumbols4$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  onSameAddress() {
    this.amphurs4$ = this.amphurs3$;
    this.tumbols4$ = this.tumbols3$;
    this.provinces4$ = this.provinces3$;
  }
}
