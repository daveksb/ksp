import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-property-two',
  templateUrl: './renew-license-property-two.component.html',
  styleUrls: ['./renew-license-property-two.component.scss'],
  providers: providerFactory(RenewLicensePropertyTwoComponent),
})
export class RenewLicensePropertyTwoComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  override form = this.fb.group({
    degree: [null, Validators.required],
    managingDegree: [null, Validators.required],
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

  override ngOnDestroy(): void {
    this.onChange(null);
    this.onTouched();
  }
}
