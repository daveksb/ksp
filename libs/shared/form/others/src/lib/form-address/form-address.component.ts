import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss'],
  providers: providerFactory(FormAddressComponent),
})
export class FormAddressComponent extends KspFormBaseComponent {
  @Input() isWhiteMode = true;

  override form = this.fb.group({
    location: [''],
    houseNumber: [''],
    villageNumber: [''],
    lane: [''],
    road: [''],
    zipCode: [''],
    provience: [''],
    subDistrict: [''],
    district: [''],
  });

  constructor(private fb: FormBuilder) {
    super();
  }
}
