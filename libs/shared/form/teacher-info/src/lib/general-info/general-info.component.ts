import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-teacher-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  providers: providerFactory(TeacherGeneralInfoComponent),
})
export class TeacherGeneralInfoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    firstName: [''],
    lastName: [''],
    degrees: this.fb.array([
      {
        name: [''],
        year: [''],
      },
    ]),
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  get degrees() {
    return this.form.controls.degrees;
  }

  addDegree() {
    const degreeform: any = this.fb.group({
      name: [''],
      year: [''],
    });
    this.degrees.push(degreeform);
  }

  deleteDegree(degreeIndex: number) {
    this.degrees.removeAt(degreeIndex);
  }

  /* validate(control: AbstractControl) {
    if (this.form.valid) {
      return null;
    }
    const errors: any = {};
    return errors;
  } */
}
