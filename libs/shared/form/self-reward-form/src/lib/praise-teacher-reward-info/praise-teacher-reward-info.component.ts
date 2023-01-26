import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-praise-teacher-reward-info',
  templateUrl: './praise-teacher-reward-info.component.html',
  styleUrls: ['./praise-teacher-reward-info.component.scss'],
  providers: providerFactory(PraiseTeacherRewardInfoComponent),
})
export class PraiseTeacherRewardInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    receivedReward: ['', Validators.required],
    rewardInfo: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        if (
          value.receivedReward === 'hasReward' &&
          value.rewardInfo?.length === 0
        ) {
          this.addFormArray(this.rewardInfo);
        } else if (
          value.receivedReward === 'noReward' &&
          value.rewardInfo &&
          value.receivedReward?.length > 0
        ) {
          this.rewardInfo.clear();
        }

        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    // this.addFormArray(this.rewardInfo);
  }

  override set value(value: any) {
    Object.keys(value).forEach((key) => {
      if (key === 'receivedReward') {
        this.form.controls.receivedReward.patchValue(value[key]);
      } else {
        const control = this.form.get(key) as FormArray;
        if (value[key].length) {
          control.removeAt(0);
          value[key].forEach((item: any, index: number) => {
            this.addFormArray(control);
            control.at(index).patchValue(item);
          });
        }
      }
    });

    if (this.mode === 'view') {
      this.form.disable();
    }

    this.onChange(value);
    this.onTouched();
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({
      rewardReceiveYear: [null, Validators.required],
      rewardName: [null, Validators.required],
      rewardDetail: [null, Validators.required],
    });
    form.push(data);
  }

  get rewardInfo() {
    return this.form.controls['rewardInfo'] as FormArray;
  }

  get hasReward() {
    return this.form.controls.receivedReward.value;
  }
}
