import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponent, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-education-level-form-four',
  templateUrl: './education-level-form-four.component.html',
  styleUrls: ['./education-level-form-four.component.scss'],
  providers: providerFactory(EducationLevelFormFourComponent),
})
export class EducationLevelFormFourComponent
  extends KspFormBaseComponent
  implements DynamicComponent
{
  override form = this.fb.group({
    educationInstitution: [],
    graduateDegree: [],
    branch: [],
    admissionDate: [],
    graduateDate: [],
    approveAcademic: [],
  });
  @Input() data: any;

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
