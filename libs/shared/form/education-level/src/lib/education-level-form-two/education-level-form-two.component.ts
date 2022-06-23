import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponent, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-education-level-form-two',
  templateUrl: './education-level-form-two.component.html',
  styleUrls: ['./education-level-form-two.component.scss'],
  providers: providerFactory(EducationLevelFormTwoComponent),
})
export class EducationLevelFormTwoComponent
  extends KspFormBaseComponent
  implements DynamicComponent
{
  override form = this.fb.group({
    educationInstitution: [],
    graduateDegree: [],
    branch: [],
    admissionDate: [],
    graduateDate: [],
    beforeDegree: [],
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
