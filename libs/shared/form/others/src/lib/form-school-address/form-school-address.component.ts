import { Component } from '@angular/core';
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
    letternumber: [],
    letterrelease: [],
    schoolId: [],
    schoolName: [],
    bureauName: [],
    address: [],
    road: [],
    provinceName: [],
    amphurName: [],
    tumbon: [],
    zipCode: [],
    moo: [],
    eMail: [],
    fax: [],
    street: [],
    telphone: [],
    web: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
