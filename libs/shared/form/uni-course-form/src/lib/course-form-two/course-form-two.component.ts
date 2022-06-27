import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-course-form-two',
  templateUrl: './course-form-two.component.html',
  styleUrls: ['./course-form-two.component.scss'],
  providers: providerFactory(CourseFormTwoComponent),
})
export class CourseFormTwoComponent extends KspFormBaseComponent {
  @Input() data: any;

  override form = this.fb.group({
    branch: [],
    major: [],
    sendApproveYear: [],
    firstYearOpen: [],
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
