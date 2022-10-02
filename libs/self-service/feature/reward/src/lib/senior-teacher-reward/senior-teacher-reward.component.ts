import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { AddressService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-senior-teacher-reward',
  templateUrl: './senior-teacher-reward.component.html',
  styleUrls: ['./senior-teacher-reward.component.scss'],
  providers: providerFactory(SeniorTeacherRewardComponent),
})
export class SeniorTeacherRewardComponent
  extends KspFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;

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
        this.tumbols2$ = this.addressService.getTumbols(value.amphur);
        const { phone, fax, email, website } = value || {
          phone: '',
          fax: '',
          email: '',
          website: '',
        };
        this.form.controls.workplace.patchValue(value);
        this.form.patchValue({
          phone,
          fax,
          email,
          website,
        });
      }
    }, 0);
  }

  @Input() prefixList: any[] = [];
  @Input() bureaus: any[] = [];
  @Input() rewardFiles!: any[];
  @Input() uniqueTimestamp!: string;

  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;

  override form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    workplace: [],
    rewardTeacherInfo: [],
    rewardCareerInfo: [],
    rewardMoneySupportInfo: [],

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
        this.onChange({
          ...value,
          workplace: {
            ...(value.workplace as any),
            phone: value.phone,
            fax: value.fax,
            email: value.email,
            website: value.website,
          },
        });
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
  }

  provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
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
      }
    }
  }
}
