import { Component, OnInit } from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-best-teacher-info',
  templateUrl: './best-teacher-info.component.html',
  styleUrls: ['./best-teacher-info.component.scss'],
  providers: providerFactory(BestTeacherInfoComponent),
})
export class BestTeacherInfoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    teacherType: [],
    startDate: [],
    position: [''],
    experienceYear: [],
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
