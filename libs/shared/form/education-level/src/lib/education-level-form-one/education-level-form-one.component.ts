import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponent, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-education-level-form-one',
  templateUrl: './education-level-form-one.component.html',
  styleUrls: ['./education-level-form-one.component.scss'],
  providers: providerFactory(EducationLevelFormOneComponent),
})
export class EducationLevelFormOneComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    educationInstitution: [],
    graduateDegree: [],
    branch: [],
    admissionDate: [],
    graduateDate: [],
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
