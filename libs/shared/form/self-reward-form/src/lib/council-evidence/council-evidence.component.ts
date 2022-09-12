import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
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

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group('');
    form.push(data);
  }

  get evidenceInfo() {
    return this.form.controls['evidenceInfo'] as FormArray;
  }
}
