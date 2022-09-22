import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-praise-teacher-reward',
  templateUrl: './praise-teacher-reward.component.html',
  styleUrls: ['./praise-teacher-reward.component.scss'],
  providers: providerFactory(PraiseTeacherRewardComponent),
})
export class PraiseTeacherRewardComponent extends KspFormBaseComponent {
  userInfoType = UserInfoFormType.thai;
  rewardFiles = ['1. รางวัลอื่นและประกาศเกียรติคุณ'];

  override form = this.fb.group({
    userInfo: [],
    addressInfo: [],
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
}
