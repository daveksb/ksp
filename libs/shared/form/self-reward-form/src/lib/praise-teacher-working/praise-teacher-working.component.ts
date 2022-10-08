import { Component, OnInit } from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ksp-praise-teacher-working',
  templateUrl: './praise-teacher-working.component.html',
  styleUrls: ['./praise-teacher-working.component.scss'],
  providers: providerFactory(PraiseTeacherWorkingComponent),
})
export class PraiseTeacherWorkingComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    area: [null, Validators.required],
    position: [null, Validators.required],
    operationYear: [null, Validators.required],
    ethicDetail: [null, Validators.required],
    workHistory: [null, Validators.required],
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
