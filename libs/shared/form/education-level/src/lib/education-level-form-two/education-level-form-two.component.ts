import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-education-level-form-two',
  templateUrl: './education-level-form-two.component.html',
  styleUrls: ['./education-level-form-two.component.scss'],
  providers: providerFactory(EducationLevelFormTwoComponent),
})
export class EducationLevelFormTwoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    educationInstitution: [],
    graduateDegree: [],
    branch: [],
    admissionDate: [],
    graduateDate: [],
    beforeDegree: [],
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
