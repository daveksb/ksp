import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-property-five',
  templateUrl: './renew-license-property-five.component.html',
  styleUrls: ['./renew-license-property-five.component.scss'],
  providers: providerFactory(RenewLicensePropertyFiveComponent),
})
export class RenewLicensePropertyFiveComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    otherDegree: [null, Validators.required],
    isTransfer: [],
    isTest: [],
    isTrain: [],
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
