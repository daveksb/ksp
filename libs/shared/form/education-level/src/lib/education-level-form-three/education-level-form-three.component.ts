import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-education-level-form-three',
  templateUrl: './education-level-form-three.component.html',
  styleUrls: ['./education-level-form-three.component.scss'],
  providers: providerFactory(EducationLevelFormThreeComponent),
})
export class EducationLevelFormThreeComponent extends KspFormBaseComponent {
  @Input() countries: any[] = [];
  override form = this.fb.group({
    resolutionTimes: [null, Validators.required],
    resolutionDate: [null, Validators.required],
    educationInstitution: [null, Validators.required],
    graduateDegree: [null, Validators.required],
    branch: [null, Validators.required],
    country: [null, Validators.required],
    admissionDate: [null, Validators.required],
    graduateDate: [null, Validators.required],
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
