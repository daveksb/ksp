import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { FormMode, SelfMyInfo } from '@ksp/shared/interface';
import { AddressService, MyInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { replaceEmptyWithNull } from '@ksp/shared/utility';
@Component({
  selector: 'self-service-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
})
export class AddressInfoComponent implements OnInit {
  label = 'แก้ไขข้อมูล';

  form = this.fb.group({
    addr1: [],
    addr2: [],
  });

  constructor(
    private myInfoService: MyInfoService,
    private addressService: AddressService,
    private fb: FormBuilder
  ) {}

  mode: FormMode = 'view';
  provinces1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  baseForm = this.fb.group(new SelfMyInfo());
  ngOnInit(): void {
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.myInfoService.getMyInfo().subscribe((res) => {
      res = this.myInfoService.formatMyInfo(res);
      this.baseForm.patchValue(res);
      this.patchAddressForm(res);
    });
  }

  patchAddressForm(res: SelfMyInfo) {
    //console.log('res  = ', res);
    if (res && res.addressinfo) {
      const addressList = JSON.parse(res.addressinfo) || null;
      for (let i = 0; i < addressList.length; i++) {
        const form = this.form.get(`addr${i + 1}`) as AbstractControl<any, any>;
        this.getAmphurChanged(i + 1, addressList[i].province);
        this.getTumbon(i + 1, addressList[i].amphur);
        form?.patchValue(addressList[i]);
      }
    }
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
  getAmphurChanged(addrType: number, province: any) {
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
  getTumbon(addrType: number, amphur: any) {
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  onClickChangeMode() {
    if (this.mode == 'view') {
      this.mode = 'edit';
      this.label = 'บันทึกข้อมูล';
    } else {
      this.savingData();
      this.mode = 'view';
      this.label = 'แก้ไขข้อมูล';
    }
  }

  savingData() {
    const formData = this.form.value;
    this.baseForm.patchValue({
      addressinfo: JSON.stringify([formData.addr1, formData.addr2]),
    });
    const payload: SelfMyInfo = replaceEmptyWithNull(this.baseForm.value);
    this.myInfoService
      .updateMyInfo(payload)
      .subscribe((res) => console.log(res));
  }
}
