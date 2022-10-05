import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'self-service-standard-working-non-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SchoolServiceFormActivityModule],
  templateUrl: './standard-working-non-teacher.component.html',
  styleUrls: ['./standard-working-non-teacher.component.scss'],
  providers: providerFactory(StandardWorkingNonTeacherComponent),
})
export class StandardWorkingNonTeacherComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    activity13: [],
    activity14: [],
    activity15: [],
    trainInfo: [],
    testInfo: [],
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
    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.activity13 !== next.activity13) {
          if (next.activity13) {
            this.form.controls.trainInfo.addValidators(Validators.required);
          } else {
            this.form.controls.trainInfo.clearValidators();
          }
          this.form.controls.trainInfo.updateValueAndValidity();
        }

        if (prev.activity14 !== next.activity14) {
          if (next.activity14) {
            this.form.controls.testInfo.addValidators(Validators.required);
          } else {
            this.form.controls.testInfo.clearValidators();
          }
          this.form.controls.testInfo.updateValueAndValidity();
        }
      });
  }

  get activity1() {
    return this.form.controls.activity13.value;
  }

  get activity2() {
    return this.form.controls.activity14.value;
  }

  get activity3() {
    return this.form.controls.activity15.value;
  }
}
