import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { AddressService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-research-reward',
  templateUrl: './research-reward.component.html',
  styleUrls: ['./research-reward.component.scss'],
  providers: providerFactory(ResearchRewardComponent),
})
export class ResearchRewardComponent
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
  set workplaceInfo(value: any) {
    setTimeout(() => {
      if (value) {
        this.amphurs$ = this.addressService.getAmphurs(value.province);
        this.tumbols$ = this.addressService.getTumbols(value.amphur);
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

  provinces$!: Observable<any>;
  amphurs$!: Observable<any>;
  tumbols$!: Observable<any>;

  override form = this.fb.group({
    userInfo: [],
    workplace: [],
    rewardResearcherInfo: [],
    rewardResearchInfo: [],
    rewardResearchHistory: [],

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
    this.provinces$ = this.addressService.getProvinces();
  }

  provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols$ = this.addressService.getTumbols(amphur);
      }
    }
  }
}
