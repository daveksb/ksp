import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-best-teacher-innovation',
  templateUrl: './best-teacher-innovation.component.html',
  styleUrls: ['./best-teacher-innovation.component.scss'],
  providers: providerFactory(BestTeacherInnovationComponent),
})
export class BestTeacherInnovationComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() rewardFiles!: any[];
  @Input() uniqueTimestamp!: string;

  override form = this.fb.group({
    innovationInfo: this.fb.array([]),
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
    this.addFormArray(this.innovationInfo);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({
      rewardType: [],
      innovationName: [],
      subjectGroup: [],
      year: [],
    });
    form.push(data);
  }

  get innovationInfo() {
    return this.form.controls['innovationInfo'] as FormArray;
  }
}
