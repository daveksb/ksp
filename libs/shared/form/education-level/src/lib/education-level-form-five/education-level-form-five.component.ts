import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-education-level-form-five',
  templateUrl: './education-level-form-five.component.html',
  styleUrls: ['./education-level-form-five.component.scss'],
  providers: providerFactory(EducationLevelFormFiveComponent),
})
export class EducationLevelFormFiveComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    levelOneForm: [],
    isTransfer: [],
    transferCount: [],
    isTest: [],
    testCount: [],
    totalCount: [],
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
