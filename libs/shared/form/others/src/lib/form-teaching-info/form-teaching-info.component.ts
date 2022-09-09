import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { levels, subjects } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-teaching-info',
  templateUrl: './form-teaching-info.component.html',
  styleUrls: ['./form-teaching-info.component.scss'],
  providers: providerFactory(FormTeachingInfoComponent),
})
export class FormTeachingInfoComponent extends KspFormBaseComponent {
  levels = levels;
  subjects = subjects;

  override form = this.fb.group({
    teachingLevel: this.fb.array([]),
    teachingSubjects: this.fb.array([]),
    teachingSubjectOther: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.addCheckboxes();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  private addCheckboxes() {
    this.levels.forEach(() =>
      this.teachingLevelFormArray.push(this.fb.control([null]))
    );

    this.subjects.forEach(() =>
      this.teachingSubjectsFormArray.push(this.fb.control([null]))
    );
  }

  get teachingSubjectsFormArray() {
    return this.form.controls.teachingSubjects as FormArray;
  }

  get teachingLevelFormArray() {
    return this.form.controls.teachingLevel as FormArray;
  }
}
