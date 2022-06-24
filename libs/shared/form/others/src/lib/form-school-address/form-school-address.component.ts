import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-school-address',
  templateUrl: './form-school-address.component.html',
  styleUrls: ['./form-school-address.component.scss'],
  providers: providerFactory(FormSchoolAddressComponent),
})
export class FormSchoolAddressComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    letterNumber: [],
    letterRelease: [],
    schoolCode: [],
    affiliation: [],
    schoolName: [],
    houseNumber: [],
    villageNumber: [],
    lane: [],
    road: [],
    zipCode: [],
    provience: [],
    subDistrict: [],
    district: [],
    phone: [],
    fax: [],
    email: [],
    website: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
