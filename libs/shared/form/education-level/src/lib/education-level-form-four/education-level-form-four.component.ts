import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-education-level-form-four',
  templateUrl: './education-level-form-four.component.html',
  styleUrls: ['./education-level-form-four.component.scss'],
  providers: providerFactory(EducationLevelFormFourComponent),
})
export class EducationLevelFormFourComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    educationInstitution: [null, Validators.required],
    graduateDegree: [null, Validators.required],
    branch: [null, Validators.required],
    admissionDate: [null, Validators.required],
    graduateDate: [null, Validators.required],
    approveAcademic: [null, Validators.required],
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
