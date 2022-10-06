import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-compare-knowledge-education',
  templateUrl: './compare-knowledge-education.component.html',
  styleUrls: ['./compare-knowledge-education.component.scss'],
  providers: providerFactory(CompareKnowledgeEducationComponent),
})
export class CompareKnowledgeEducationComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    degreeInfo1: this.fb.array([]),
    degreeInfo2: this.fb.array([]),
    degreeInfo3: this.fb.array([]),
    degreeInfo4: this.fb.array([]),
    degreeInfo5: this.fb.array([]),
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

  override set value(value: any) {
    console.log(value);
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

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      //console.log('form value = ', res);
    });
    this.setDefaulFormValue();
  }

  setDefaulFormValue() {
    this.addFormArray(this.degreeInfo1);
    this.addFormArray(this.degreeInfo2);
    this.addFormArray(this.degreeInfo3);
    this.addFormArray(this.degreeInfo4);
    this.addFormArray(this.degreeInfo5);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({
      degreeLevel: [null, Validators.required],
      institute: [null, Validators.required],
    });
    form.push(data);
  }

  get degreeInfo1() {
    return this.form.controls['degreeInfo1'] as FormArray;
  }

  get degreeInfo2() {
    return this.form.controls['degreeInfo2'] as FormArray;
  }

  get degreeInfo3() {
    return this.form.controls['degreeInfo3'] as FormArray;
  }

  get degreeInfo4() {
    return this.form.controls['degreeInfo4'] as FormArray;
  }

  get degreeInfo5() {
    return this.form.controls['degreeInfo5'] as FormArray;
  }
}
