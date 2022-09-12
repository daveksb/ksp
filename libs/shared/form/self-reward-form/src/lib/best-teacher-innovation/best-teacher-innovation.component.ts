import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.addFormArray(this.innovationInfo);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group('');
    form.push(data);
  }

  get innovationInfo() {
    return this.form.controls['innovationInfo'] as FormArray;
  }
}
