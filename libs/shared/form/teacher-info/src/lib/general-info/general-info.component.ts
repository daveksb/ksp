import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';

const providerFactory: Provider[] = [
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => TeacherGeneralInfoComponent),
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => TeacherGeneralInfoComponent),
  },
];

@Component({
  selector: 'ksp-teacher-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  providers: providerFactory,
})
export class TeacherGeneralInfoComponent
  extends KspFormBaseComponent
  implements OnInit, ControlValueAccessor
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
