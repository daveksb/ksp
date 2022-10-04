import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-education-level-form-six',
  templateUrl: './education-level-form-six.component.html',
  styleUrls: ['./education-level-form-six.component.scss'],
  providers: providerFactory(EducationLevelFormSixComponent),
})
export class EducationLevelFormSixComponent extends KspFormBaseComponent {
  @Input() isHasCountry = false;

  override form = this.fb.group({
    levelOneForm: [],
    resolutionNo: [],
    resolutionDate: [],
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
