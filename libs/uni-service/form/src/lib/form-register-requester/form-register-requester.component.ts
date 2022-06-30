import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'uni-form-register-requester',
  templateUrl: './form-register-requester.component.html',
  styleUrls: ['./form-register-requester.component.scss'],
  providers: providerFactory(FormRegisterRequesterInfoComponent),
})
export class FormRegisterRequesterInfoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    grant: [],
    personId: [],
    prefixTh: [],
    firstnameTh: [],
    lastnameTh: [],
    prefixEn: [],
    firstnameEn: [],
    lastnameEn: [],
    post: [],
    other: [],
    affiliation: [],
    workPlacePhone: [],
    contactPhone: [],
    email: [],
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
