import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-course-form-three',
  templateUrl: './course-form-three.component.html',
  styleUrls: ['./course-form-three.component.scss'],
  providers: providerFactory(CourseFormThreeComponent),
})
export class CourseFormThreeComponent extends KspFormBaseComponent {
  @Input() data: any;

  override form = this.fb.group({
    major1: [],
    major2: [],
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
