import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-add-degree',
  templateUrl: './activity-add-degree.component.html',
  styleUrls: ['./activity-add-degree.component.scss'],
  providers: providerFactory(ActivityAddDegreeComponent),
})
export class ActivityAddDegreeComponent extends KspFormBaseComponent {
  @Input() data: any;

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
