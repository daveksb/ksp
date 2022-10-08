import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-council-evidence',
  templateUrl: './council-evidence.component.html',
  styleUrls: ['./council-evidence.component.scss'],
  providers: providerFactory(CouncilEvidenceComponent),
})
export class CouncilEvidenceComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() rewardFiles!: any[];
  @Input() uniqueTimestamp!: string;

  override form = this.fb.group({
    evidenceInfo: this.fb.array([]),
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
    this.addFormArray(this.evidenceInfo);
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
      rewardYear: [null, Validators.required],
      rewardName: [null, Validators.required],
      rewardDetail: [null, Validators.required],
    });
    form.push(data);
  }

  get evidenceInfo() {
    return this.form.controls['evidenceInfo'] as FormArray;
  }
}
