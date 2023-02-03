import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { dateDiff, providerFactory } from '@ksp/shared/utility';

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
  sum: number[][] = [];

  override form = this.fb.group({
    position: [null, Validators.required],
    professionalType: [null, Validators.required],
    resignDate: [null, Validators.required],
    earlyRetireDate: [null, Validators.required],

    workingInfo: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();

        this.sum = this.workingInfo.value.map((v: any) => {
          if (v.startDate && v.endDate) {
            const start = new Date(v.startDate);
            const end = new Date(v.endDate);
            const diff = dateDiff(start, end);
            const day = diff % 30;
            const diffMonth = Math.floor(diff / 30);
            const year = Math.floor(diffMonth / 12);
            const month = diffMonth % 12;
            return [year, month, day];
          } else {
            return [0, 0, 0];
          }
        });
      })
    );
  }

  ngOnInit(): void {
    this.addFormArray(this.workingInfo);
  }

  override set value(value: any) {
    Object.keys(value).forEach((key) => {
      if (this.form.get(key) instanceof FormArray) {
        const control = this.form.get(key) as FormArray;
        if (value[key].length) {
          control.removeAt(0);
          value[key].forEach((item: any, index: number) => {
            this.addFormArray(control);
            control.at(index).patchValue(item);
          });
        }
      } else {
        this.form.get(key)?.patchValue(value[key]);
      }
    });

    if (this.mode === 'view') {
      this.form.disable();
    }

    this.onChange(value);
    this.onTouched();
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    this.sum = [...this.sum.slice(0, index), ...this.sum.slice(index + 1)];
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({
      professionalType: [null, Validators.required],
      position: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
    form.push(data);
    this.sum.push([0, 0, 0]);
  }

  get workingInfo() {
    return this.form.controls['workingInfo'] as FormArray;
  }
}
