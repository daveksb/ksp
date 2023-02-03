import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-property-six',
  templateUrl: './renew-license-property-six.component.html',
  styleUrls: ['./renew-license-property-six.component.scss'],
  providers: providerFactory(RenewLicensePropertySixComponent),
})
export class RenewLicensePropertySixComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    degree: [null, Validators.required],
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
