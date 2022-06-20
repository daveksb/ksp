import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';

export const providerFactory = (component: any) => [
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => component),
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => component),
  },
];

@Component({
  selector: 'ksp-teacher-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  providers: providerFactory(TeacherGeneralInfoComponent),
})
export class TeacherGeneralInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
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

  ngOnInit(): void {
    if (this.mode === 'view') this.form.disable();
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
