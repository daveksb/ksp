import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'uni-form-register-coordinator',
  templateUrl: './form-register-coordinator.component.html',
  styleUrls: ['./form-register-coordinator.component.scss'],
  providers: providerFactory(FormRegisterCoordinatorInfoComponent),
})
export class FormRegisterCoordinatorInfoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    prefixTh: [],
    firstnameTh: [],
    lastnameTh: [],
    prefixEn: [],
    firstnameEn: [],
    lastnameEn: [],
    post: [],
    other: [],
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

  @Input() formHeader = '';
}
