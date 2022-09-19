import { Component, Input, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GeneralInfoService, AddressService } from '@ksp/shared/service';

@Component({
  selector: 'self-service-foreign-license-step-two',
  templateUrl: './foreign-license-step-two.component.html',
  styleUrls: ['./foreign-license-step-two.component.scss'],
})
export class ForeignLicenseStepTwoComponent implements OnInit {
  prefixList$!: Observable<any>;
  provinces1$!: Observable<any>;
  district1$!: Observable<any>;
  subDistrict1$!: Observable<any>;
  provinces2$!: Observable<any>;
  district2$!: Observable<any>;
  subDistrict2$!: Observable<any>;
  nationalitys$!: Observable<any>;
  countries$!: Observable<any>;

  academicFiles = [
    {
      name: `1. Achelor's degree`,
      fileId: '',
    },
  ];

  constructor(
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.getListData();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.countries$ = this.addressService
      .getCountry()
      .pipe(tap((res) => console.log(res)));
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
