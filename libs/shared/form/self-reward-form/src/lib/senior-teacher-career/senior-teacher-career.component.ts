import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-senior-teacher-career',
  templateUrl: './senior-teacher-career.component.html',
  styleUrls: ['./senior-teacher-career.component.scss'],
  providers: providerFactory(SeniorTeacherCareerComponent),
})
export class SeniorTeacherCareerComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() btnLabel = '';

  override form = this.fb.group({
    workingInfo: this.fb.array([]),
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

  ngOnInit(): void {
    this.addFormArray(this.workingInfo);
  }

  override set value(value: any) {
    Object.keys(value).forEach((key) => {
      const control = this.form.get(key) as FormArray;
      if (value[key].length) {
        control.removeAt(0);
        value[key].forEach((item: any) =>
          control.push(
            this.fb.group({
              ...item,
            })
          )
        );
      }
    });

    this.onChange(value);
    this.onTouched();
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({
      professionalType: [],
      position: [],
      startDate: [],
      endDate: [],
      durationYear: [],
      durationMonth: [],
    });
    form.push(data);
  }

  get workingInfo() {
    return this.form.controls['workingInfo'] as FormArray;
  }
}
