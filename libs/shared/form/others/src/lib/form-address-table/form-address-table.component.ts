import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressService } from '@ksp/shared/service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'ksp-form-address-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-address-table.component.html',
  styleUrls: ['./form-address-table.component.scss'],
})
export class FormAddressTableComponent implements OnInit {
  formAddress = this.fb.group({
    location: [''],
    houseNumber: [''],
    villageNumber: [''],
    lane: [''],
    road: [''],
    zipCode: [''],
    provinceId: [null],
    districtId: [null],
    subDistrictId: [null],
    remark: ['']
  });
  provinceList: Array<any> = [];
  districtList: Array<any>  = [];
  subDistrictList: Array<any> = [];

  @Input() addressData: any = {};

  constructor(private fb: FormBuilder, private addressService:AddressService) {}

  ngOnInit(): void {
    this.getProvince();
    if (this.addressData.provinceId) {
      this.getDistrict(this.addressData.provinceId);
    }
    if (this.addressData.districtId) {
      this.getSubdistrict(this.addressData.districtId);
    }
  }

  getProvince() {
    this.addressService.getProvinces().subscribe(response=>{
      if (response) {
        this.provinceList = response;
      }
    })
  }

  getDistrict(provinceId: any) {
    console.log(provinceId)
    this.addressService.getAmphurs(provinceId).subscribe(response=>{
      if (response) {
        this.districtList = response;
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
}
