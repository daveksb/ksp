import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-senior-teacher-info',
  templateUrl: './senior-teacher-info.component.html',
  styleUrls: ['./senior-teacher-info.component.scss'],
  providers: providerFactory(SeniorTeacherInfoComponent),
})
export class SeniorTeacherInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    position: [null, Validators.required],
    professionalType: [null, Validators.required],
    resignationDetail: [null, Validators.required],
    earlyRetireDetail: [null, Validators.required],
    disciplineDetail: [null, Validators.required],
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

  ngOnInit(): void {}
}
