import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
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
    receivedReward: [],
    rewardInfo: this.fb.array([]),
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
    this.addFormArray(this.rewardInfo);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({
      rewardReceiveYear: [],
      rewardName: [],
      rewardDetail: [],
    });
    form.push(data);
  }

  get rewardInfo() {
    return this.form.controls['rewardInfo'] as FormArray;
  }
}
