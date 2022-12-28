import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

function atLeastOneFormValidator(): any {
  return (form: FormGroup) => {
    const degreeInfo1: any[] = form.get('degreeInfo1')?.value;
    const degreeInfo2: any[] = form.get('degreeInfo2')?.value;
    const degreeInfo3: any[] = form.get('degreeInfo3')?.value;
    const degreeInfo4: any[] = form.get('degreeInfo4')?.value;
    const degreeInfo5: any[] = form.get('degreeInfo5')?.value;

    if (
      !(
        degreeInfo1.length ||
        degreeInfo2.length ||
        degreeInfo3.length ||
        degreeInfo4.length ||
        degreeInfo5.length
      )
    ) {
      return { oneform: true };
    }

    return null;
  };
}

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
  mapping: { [key: number]: any } = {
    1: this.degreeInfo1,
    2: this.degreeInfo2,
    3: this.degreeInfo3,
    4: this.degreeInfo4,
    5: this.degreeInfo5,
  };

  @Input() countries: any[] = [];
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
    Object.keys(value).forEach((key) => {
      if (value[key].length) {
        const control = this.form.get(key) as FormArray;
        //control.removeAt(0);
        value[key].forEach((item: any) => {
          control.push(
            this.fb.group({
              ...item,
            })
          );
        });
      }
    });

    if (this.mode === 'view') {
      this.form.disable();
    }

    this.onChange(value);
    this.onTouched();
  }

  ngOnInit(): void {
    this.form.setValidators(atLeastOneFormValidator());
    this.form.valueChanges.subscribe((res) => {
      //console.log('form value = ', res);
    });
    // this.setDefaulFormValue();
  }

  setDefaulFormValue() {
    this.addFormArray(1);
    this.addFormArray(2);
    this.addFormArray(3);
    this.addFormArray(4);
    this.addFormArray(5);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(formNumber: number) {
    const form = this.mapping[formNumber];
    let data;

    if (formNumber === 1) {
      data = this.fb.group({
        degreeLevel: [null, Validators.required],
        institute: [null, Validators.required],
      });
    } else {
      data = this.fb.group({
        degreeInfo: [null, Validators.required],
      });
    }
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
