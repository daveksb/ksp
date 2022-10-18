import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-property-one',
  templateUrl: './renew-license-property-one.component.html',
  styleUrls: ['./renew-license-property-one.component.scss'],
  providers: providerFactory(RenewLicensePropertyOneComponent),
})
export class RenewLicensePropertyOneComponent
  extends KspFormBaseComponent
  implements OnDestroy, OnInit
{
  override form = this.fb.group({
    degreeInfo: this.fb.array([]),
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
    this.addFormArray(this.degreeInfo);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({
      hasEducationCertificate: [],
      hasDegreeLevel: [],
      level: [null, Validators.required],
      degree: [null, Validators.required],
    });
    form.push(data);
  }

  get degreeInfo() {
    return this.form.controls['degreeInfo'] as FormArray;
  }

  override ngOnDestroy(): void {
    this.onChange(null);
    this.onTouched();
  }

  override set value(value: any) {
    console.log(value);
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }
}
