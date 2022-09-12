import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-council-ethic',
  templateUrl: './council-ethic.component.html',
  styleUrls: ['./council-ethic.component.scss'],
  providers: providerFactory(CouncilEthicComponent),
})
export class CouncilEthicComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    ethicInfo: this.fb.array([]),
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
    this.addFormArray(this.ethicInfo);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group('');
    form.push(data);
  }

  get ethicInfo() {
    return this.form.controls['ethicInfo'] as FormArray;
  }
}
