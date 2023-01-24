import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { AddressService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-best-teacher-reward',
  templateUrl: './best-teacher-reward.component.html',
  styleUrls: ['./best-teacher-reward.component.scss'],
  providers: providerFactory(BestTeacherRewardComponent),
})
export class BestTeacherRewardComponent
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
  provinces3$!: Observable<any>;
  amphurs3$!: Observable<any>;
  tumbols3$!: Observable<any>;
  provinces4$!: Observable<any>;
  amphurs4$!: Observable<any>;
  tumbols4$!: Observable<any>;

  override form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    workplace: [],

    eduInfo: [],
    hiringInfo: [],
    rewardDetailInfo: [],
    rewardPunishmentInfo: [],

    phone: [],
    fax: [],
    email: [],
    website: [],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private addressService: AddressService
  ) {
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
    this.provinces3$ = this.provinces1$;
    this.provinces4$ = this.provinces1$;
  }

  override set value(value: any) {
    const { teachingInfo } = value;
    if (teachingInfo) {
      this.amphurs3$ = this.addressService.getAmphurs(teachingInfo.province);
      this.tumbols3$ = this.addressService.getTumbols(teachingInfo.district);
      this.amphurs4$ = this.addressService.getAmphurs(
        teachingInfo.currentProvince
      );
      this.tumbols4$ = this.addressService.getTumbols(
        teachingInfo.currentDistrict
      );
    }
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
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
