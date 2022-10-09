import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-foreign-step-two-tab-four-renew',
  templateUrl: './foreign-step-two-tab-four-renew.component.html',
  styleUrls: ['./foreign-step-two-tab-four-renew.component.scss'],
  providers: providerFactory(ForeignStepTwoTabFourRenewComponent),
})
export class ForeignStepTwoTabFourRenewComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    licenseNo: ['', Validators.required],
    dateOfAdmission: ['', Validators.required],
    dateOfGraduation: ['', Validators.required],
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

  ngOnInit(): void {}
}
