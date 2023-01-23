import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { dateDiff, providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-council-working',
  templateUrl: './council-working.component.html',
  styleUrls: ['./council-working.component.scss'],
  providers: providerFactory(CouncilWorkingComponent),
})
export class CouncilWorkingComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    workInfo: this.fb.array([]),
  });
  dateDiff = dateDiff;

  sum: number[][] = [];

  get sumYear() {
    return this.sum.reduce((a, b) => a + b[0], 0);
  }

  get sumMonth() {
    return this.sum.reduce((a, b) => a + b[1], 0);
  }

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();

        this.sum = this.workInfo.value.map((v: any) => {
          if (v.startDate && v.endDate) {
            const start = new Date(v.startDate);
            const end = new Date(v.endDate);
            const diff = dateDiff(start, end);
            const diffMonth = Math.floor(diff / 30);
            const year = Math.floor(diffMonth / 12);
            const month = diffMonth % 12;
            return [year, month];
          } else {
            return [0, 0];
          }
        });
      })
    );
  }

  ngOnInit(): void {
    this.addFormArray(this.workInfo);
  }

  override set value(value: any) {
    Object.keys(value).forEach((key) => {
      const control = this.form.get(key) as FormArray;
      if (value[key].length) {
        control.removeAt(0);
        value[key].forEach((item: any, index: number) => {
          this.addFormArray(control);
          control.at(index).patchValue(item);
        });
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
      position: [null, Validators.required],
      academicStanding: [null, Validators.required],
      status: [null, Validators.required],
      salary: [null, Validators.required],
      qualification: [null, Validators.required],
      achievement: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
    form.push(data);
    this.sum.push([0, 0]);
  }

  get workInfo() {
    return this.form.controls['workInfo'] as FormArray;
  }
}
