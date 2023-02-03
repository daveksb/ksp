import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'ksp-renew-license-property-degree-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './renew-license-property-degree-form.component.html',
  styleUrls: ['./renew-license-property-degree-form.component.scss'],
  providers: providerFactory(RenewLicensePropertyDegreeFormComponent),
})
export class RenewLicensePropertyDegreeFormComponent extends KspFormBaseComponent {
  @Input() hasGraduateDate = true;
  @Input() hasExperience = false;
  @Input() degreeLabel = 'วุฒิการศึกษา';

  override form = this.fb.group({
    degreeLabel: [null, Validators.required],
    managingExperienceYear: [],
    institute: [null, Validators.required],
    major: [null, Validators.required],
    entryDate: [null, Validators.required],
    graduationDate: [],
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
