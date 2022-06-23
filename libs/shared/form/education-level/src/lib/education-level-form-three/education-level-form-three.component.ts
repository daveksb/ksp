import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponent, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-education-level-form-three',
  templateUrl: './education-level-form-three.component.html',
  styleUrls: ['./education-level-form-three.component.scss'],
  providers: providerFactory(EducationLevelFormThreeComponent),
})
export class EducationLevelFormThreeComponent
  extends KspFormBaseComponent
  implements DynamicComponent
{
  override form = this.fb.group({
    resolutionTimes: [],
    resolutionDate: [],
    educationInstitution: [],
    graduateDegree: [],
    branch: [],
    country: [],
    admissionDate: [],
    graduateDate: [],
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
