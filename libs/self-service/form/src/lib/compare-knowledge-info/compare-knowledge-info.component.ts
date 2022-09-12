import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-compare-knowledge-info',
  templateUrl: './compare-knowledge-info.component.html',
  styleUrls: ['./compare-knowledge-info.component.scss'],
  providers: providerFactory(CompareKnowledgeInfoComponent),
})
export class CompareKnowledgeInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    degreeInfo1: this.fb.array([]),
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
    this.form.valueChanges.subscribe((res) => {
      //console.log('form value = ', res);
    });
    this.setDefaulFormValue();
  }

  setDefaulFormValue() {
    this.addFormArray(this.degreeInfo1);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({});
    form.push(data);
  }

  get degreeInfo1() {
    return this.form.controls['degreeInfo1'] as FormArray;
  }
}
