import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-transfer-knowledge-education',
  templateUrl: './transfer-knowledge-education.component.html',
  styleUrls: ['./transfer-knowledge-education.component.scss'],
  providers: providerFactory(TransferKnowledgeEducationComponent),
})
export class TransferKnowledgeEducationComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() countries: any[] = [];
  override form = this.fb.group({
    licenseInfo1: this.fb.array([]),
    licenseInfo2: this.fb.array([]),
    licenseInfo3: this.fb.array([]),
    licenseInfo4: this.fb.array([]),
    licenseInfo5: this.fb.array([]),
  });
  mapping: { [key: number]: any } = {
    1: this.licenseInfo1,
    2: this.licenseInfo2,
    3: this.licenseInfo3,
    4: this.licenseInfo4,
    5: this.licenseInfo5,
  };
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
    // this.setDefaulFormValue();
    this.form.valueChanges.subscribe((res) => {
      // console.log('form value = ', res);
    });
  }

  override set value(value: any) {
    // this.form.patchValue(value);
    if (value) {
      Object.keys(value).forEach((key) => {
        const control = this.form.get(key) as FormArray;
        value[key].forEach((item: any) =>
          control.push(
            this.fb.group({
              ...item,
            })
          )
        );
      });
    }

    this.onChange(value);
    this.onTouched();
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
    if (formNumber === 5) {
      data = this.fb.group({
        certificationType: [],
        recognizedOrganization: [],
        certificateNo: [],
        issueDate: [],
      });
    } else {
      data = this.fb.group({
        licenseForm: [],
      });
    }

    form.push(data);
  }

  get licenseInfo1() {
    return this.form.controls['licenseInfo1'] as FormArray;
  }

  get licenseInfo2() {
    return this.form.controls['licenseInfo2'] as FormArray;
  }

  get licenseInfo3() {
    return this.form.controls['licenseInfo3'] as FormArray;
  }

  get licenseInfo4() {
    return this.form.controls['licenseInfo4'] as FormArray;
  }

  get licenseInfo5() {
    return this.form.controls['licenseInfo5'] as FormArray;
  }
}
