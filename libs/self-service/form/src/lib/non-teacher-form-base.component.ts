import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs/operators';

const formMap = ['activity13', 'activity14', 'activity15'];

@UntilDestroy()
@Component({
  template: ``,
  standalone: true,
})
export abstract class NonTeacherFormBaseComponent
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
    this.form.setValidators(this.onlyOneFormValidator());
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

  onlyOneFormValidator(): any {
    return (form: FormGroup) => {
      const checkedForms = formMap.reduce((acc, cur) => {
        const currentForm = form.get(cur)?.value;
        if (currentForm) {
          acc = acc + 1;
        }
        return acc;
      }, 0);
      return checkedForms === 1 ? null : { checkform: true };
    };
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
