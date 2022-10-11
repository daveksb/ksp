import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressService } from '@ksp/shared/service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'ksp-form-address-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-address-table.component.html',
  styleUrls: ['./form-address-table.component.scss'],
  providers: providerFactory(FormAddressTableComponent),
})
export class FormAddressTableComponent
  extends KspFormBaseComponent
  implements OnInit {
  override form = this.fb.group({
    location: [],
    housenumber: ['', Validators.required],
    villagenumber: [],
    lane: [],
    road: [],
    zipcode: ['', Validators.required],
    provinceid: [null, Validators.required],
    districtid: [null, Validators.required],
    subdistrictid: [null, Validators.required],
    remark: []
  });
  provinceList: Array<any> = [];
  districtList: Array<any>  = [];
  subDistrictList: Array<any> = [];

  @Input() addressData: any = {};

  constructor(
    private fb: FormBuilder, 
    private addressService:AddressService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    if (this.data && this.data.mode == 'view') {
      this.form.patchValue({
        location: this.data.address.location || null,
        housenumber: this.data.address.housenumber || null,
        villagenumber: this.data.address.villagenumber || null,
        lane: this.data.address.lane || null,
        road: this.data.address.road || null,
        zipcode: this.data.address.zipcode || null,
        provinceid: this.data.address.provinceid || null,
        districtid: this.data.address.districtid || null,
        subdistrictid: this.data.address.subdistrictid || null,
        remark: this.data.address.remark || null
      });
      this.form.disable();
    }
    this.getAll();
  }

  getAll() {
    this.getProvince();
  }

  getProvince() {
    this.addressService.getProvinces().subscribe(response=>{
      if (response) {
        this.provinceList = response;
        if (this.form.value.provinceid || (this.data && this.data.address.provinceid)) {
          this.getDistrict(this.form.value.provinceid || this.data.address.provinceid);
        }
      }
    })
  }

  getDistrict(provinceId: any) {
    this.addressService.getAmphurs(provinceId).subscribe(response=>{
      if (response) {
        this.districtList = response;
        if (this.form.value.districtid || (this.data && this.data.address.districtid)) {
          this.getSubdistrict(this.form.value.districtid || this.data.address.districtid);
        }
      }
    })
  }

  getSubdistrict(districtId: any) {
    this.addressService.getTumbols(districtId).subscribe(response=>{
      if (response) {
        this.subDistrictList = response;
      }
    })
  }

  selectSubdistrict(event: any) {
    const findPostcode = this.subDistrictList.find(((data: any)=>{
      return data.tambolCode == event.target.value;
    }))
    if (findPostcode) {
      this.form.patchValue({
        zipcode: findPostcode.tambolPostcode
      })
    }
  }
}
