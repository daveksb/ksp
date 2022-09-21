import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'self-service-foreign-step-two-tab-four',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './foreign-step-two-tab-four.component.html',
  styleUrls: ['./foreign-step-two-tab-four.component.scss'],
  providers: providerFactory(ForeignStepTwoTabFourComponent),
})
export class ForeignStepTwoTabFourComponent extends KspFormBaseComponent {
  @Input() countryList: any[] = [];

  override form = this.fb.group({
    hasLicense: [''],
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
}
