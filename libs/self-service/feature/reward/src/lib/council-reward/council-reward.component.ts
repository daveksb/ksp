import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { AddressService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-council-reward',
  templateUrl: './council-reward.component.html',
  styleUrls: ['./council-reward.component.scss'],
  providers: providerFactory(CouncilRewardComponent),
})
export class CouncilRewardComponent
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
      console.log(value);
      if (value?.length) {
        value.map((addr: any, i: number) => {
          if (i === 0) {
            this.amphurs1$ = this.addressService.getAmphurs(addr.province);
            this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
            this.form.controls.address1.patchValue(addr);
          }
          if (i === 1) {
            this.amphurs2$ = this.addressService.getAmphurs(addr.province);
            this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
            this.form.controls.address2.patchValue(addr);
          }
        });
      }
    }, 0);
  }
  @Input() prefixList: any[] = [];
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
    address1: [],
    address2: [],
    eduInfo: [],
    hiringInfo: [],
    rewardEthicInfo: [],
    rewardSuccessInfo: [],
    rewardDetailInfo: [],
  });

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange({
          ...value,
          addressInfo: [value.address1, value.address2],
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
      // else if (addrType === 3) {
      //   this.amphurs3$ = this.addressService.getAmphurs(province);
      // } else if (addrType === 4) {
      //   this.amphurs4$ = this.addressService.getAmphurs(province);
      // }
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
      // else if (addrType === 3) {
      //   this.tumbols3$ = this.addressService.getTumbols(amphur);
      // } else if (addrType === 4) {
      //   this.tumbols4$ = this.addressService.getTumbols(amphur);
      // }
    }
  }
}
