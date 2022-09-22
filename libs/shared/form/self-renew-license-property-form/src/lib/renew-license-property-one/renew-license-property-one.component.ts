import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-property-one',
  templateUrl: './renew-license-property-one.component.html',
  styleUrls: ['./renew-license-property-one.component.scss'],
  providers: providerFactory(RenewLicensePropertyOneComponent),
})
export class RenewLicensePropertyOneComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    hasEducationCertificate: [],
    hasDegreeLevel: [],
    level: [],
    degree: [],
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
