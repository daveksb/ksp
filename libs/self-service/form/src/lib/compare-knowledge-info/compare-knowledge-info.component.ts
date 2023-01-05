import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
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
  degreeMajor = this.fb.group({
    subject: [null, Validators.required],
    testResult: [null, Validators.required],
    scoreLevel: [null, Validators.required],
    scoreValidDate: [null, Validators.required],
  });

  override form = this.fb.group({
    thaiTestScore: [null, Validators.required],
    thaiScoreLevel: [null, Validators.required],
    thaiScoreValidDate: [null, Validators.required],
    englishTestScore: [null, Validators.required],
    englishScoreLevel: [null, Validators.required],
    englishScoreValidDate: [null, Validators.required],
    techTestScore: [null, Validators.required],
    techScoreLevel: [null, Validators.required],
    techScoreValidDate: [null, Validators.required],
    degreeInfo: this.fb.array([this.degreeMajor]),
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
    /* this.setDefaulFormValue(); */
  }

  override set value(value: any) {
    this.form.patchValue(value);

    if (value.degreeInfo?.length) {
      this.form.controls.degreeInfo.removeAt(0);

      value.degreeInfo.forEach((item: any, index: number) => {
        this.addFormArray();
        this.degree.at(index).patchValue(item);
      });
    }

    if (this.mode === 'view') {
      this.form.disable();
    }

    this.onChange(value);
    this.onTouched();
  }

  /* setDefaulFormValue() {
    this.addFormArray();
  } */

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray() {
    const data = this.fb.group({
      subject: [null, Validators.required],
      testResult: [null, Validators.required],
      scoreLevel: [null, Validators.required],
      scoreValidDate: [null, Validators.required],
    });
    this.degree.push(data);
  }

  get degree() {
    return this.form.controls.degreeInfo;
  }

  get degreeInfo() {
    return this.form.controls['degreeInfo'] as FormArray;
  }
}
