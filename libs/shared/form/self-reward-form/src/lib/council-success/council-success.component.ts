import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-council-success',
  templateUrl: './council-success.component.html',
  styleUrls: ['./council-success.component.scss'],
  providers: providerFactory(CouncilSuccessComponent),
})
export class CouncilSuccessComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    standardInfo: this.fb.array([]),
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
    this.addFormArray(this.standardInfo);
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

    this.onChange(value);
    this.onTouched();
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({
      standard: [null, Validators.required],
      details: [null, Validators.required],
    });
    form.push(data);
  }

  get standardInfo() {
    return this.form.controls['standardInfo'] as FormArray;
  }
}
