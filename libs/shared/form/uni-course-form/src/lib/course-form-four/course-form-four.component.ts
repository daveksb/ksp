import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-course-form-four',
  templateUrl: './course-form-four.component.html',
  styleUrls: ['./course-form-four.component.scss'],
  providers: providerFactory(CourseFormFourComponent),
})
export class CourseFormFourComponent extends KspFormBaseComponent {
  @Input() data: any;

  override form = this.fb.group({
    major: [],
    minorSubject: [],
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
