import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-property-three',
  templateUrl: './renew-license-property-three.component.html',
  styleUrls: ['./renew-license-property-three.component.scss'],
  providers: providerFactory(RenewLicensePropertyThreeComponent),
})
export class RenewLicensePropertyThreeComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    degree: [],
    managingDegree: [],
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
