import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'self-service-foreign-step-two-tab-four',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './foreign-step-two-tab-four.component.html',
  styleUrls: ['./foreign-step-two-tab-four.component.scss'],
  providers: providerFactory(ForeignStepTwoTabFourComponent),
})
export class ForeignStepTwoTabFourComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() countryList: Country[] | null = [];

  override form = this.fb.group({
    hasLicense: ['', Validators.required],
    country: [''],
    issuedBy: [''],
    licenseType: [''],
    licenseNo: [''],
    issuedDate: [''],
    validUntil: [''],
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

  ngOnInit() {
    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.hasLicense !== next.hasLicense && this.mode !== 'view') {
          if (next.hasLicense === '1') {
            this.enableform();

            this.form.controls.country.addValidators(Validators.required);
            this.form.controls.issuedBy.addValidators(Validators.required);
            this.form.controls.licenseType.addValidators(Validators.required);
            this.form.controls.licenseNo.addValidators(Validators.required);
            this.form.controls.issuedDate.addValidators(Validators.required);
            this.form.controls.validUntil.addValidators(Validators.required);
          } else {
            this.resetform();
            this.disableform();

            this.form.controls.country.clearValidators();
            this.form.controls.issuedBy.clearValidators();
            this.form.controls.licenseType.clearValidators();
            this.form.controls.licenseNo.clearValidators();
            this.form.controls.issuedDate.clearValidators();
            this.form.controls.validUntil.clearValidators();
          }
          this.form.controls.country.updateValueAndValidity();
          this.form.controls.issuedBy.updateValueAndValidity();
          this.form.controls.licenseType.updateValueAndValidity();
          this.form.controls.licenseNo.updateValueAndValidity();
          this.form.controls.issuedDate.updateValueAndValidity();
          this.form.controls.validUntil.updateValueAndValidity();
        }
      });
  }

  resetform() {
    this.form.controls.country.reset();
    this.form.controls.issuedBy.reset();
    this.form.controls.licenseType.reset();
    this.form.controls.licenseNo.reset();
    this.form.controls.issuedDate.reset();
    this.form.controls.validUntil.reset();
  }

  disableform() {
    this.form.controls.country.disable();
    this.form.controls.issuedBy.disable();
    this.form.controls.licenseType.disable();
    this.form.controls.licenseNo.disable();
    this.form.controls.issuedDate.disable();
    this.form.controls.validUntil.disable();
  }

  enableform() {
    this.form.controls.country.enable();
    this.form.controls.issuedBy.enable();
    this.form.controls.licenseType.enable();
    this.form.controls.licenseNo.enable();
    this.form.controls.issuedDate.enable();
    this.form.controls.validUntil.enable();
  }
}
