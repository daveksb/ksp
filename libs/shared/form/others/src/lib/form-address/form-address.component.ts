import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss'],
})
export class FormAddressComponent {
  form = this.fb.group({
    location: [],
    houseNumber: [],
    villageNumber: [],
    lane: [],
    road: [],
    zipCode: [],
    provience: [],
    subDistrict: [],
    district: [],
  });

  @Input() isWhiteMode = true;

  constructor(private fb: FormBuilder) {}
}
