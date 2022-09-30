import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-research-submit',
  templateUrl: './research-submit.component.html',
  styleUrls: ['./research-submit.component.scss'],
  providers: providerFactory(ResearchSubmitComponent),
})
export class ResearchSubmitComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    researchInfo: this.fb.array([]),
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
    this.addFormArray(this.researchInfo);
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
      rewardName: [],
      rewardStatus: [],
      rewardYear: [],
    });
    form.push(data);
  }

  get researchInfo() {
    return this.form.controls['researchInfo'] as FormArray;
  }
}
