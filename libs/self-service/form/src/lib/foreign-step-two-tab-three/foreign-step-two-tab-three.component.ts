import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForeignStepTwoTabThreeFormComponent } from '../foreign-step-two-tab-three-form/foreign-step-two-tab-three-form.component';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-foreign-step-two-tab-three',
  standalone: true,
  imports: [
    CommonModule,
    ForeignStepTwoTabThreeFormComponent,
    AddRowButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './foreign-step-two-tab-three.component.html',
  styleUrls: ['./foreign-step-two-tab-three.component.scss'],
  providers: providerFactory(ForeignStepTwoTabThreeComponent),
})
export class ForeignStepTwoTabThreeComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    licenseInfo1: this.fb.array([]),
    licenseInfo2: this.fb.array([]),
    licenseInfo3: this.fb.array([]),
    licenseInfo4: this.fb.array([]),
    licenseInfo5: this.fb.array([]),
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
  }

  setDefaulFormValue() {
    this.addFormArray(this.licenseInfo1);
    this.addFormArray(this.licenseInfo2);
    this.addFormArray(this.licenseInfo3);
    this.addFormArray(this.licenseInfo4);
    this.addFormArray(this.licenseInfo5);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({ title: [''] });
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
