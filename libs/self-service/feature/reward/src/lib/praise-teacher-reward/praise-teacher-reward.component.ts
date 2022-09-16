import { Component, OnInit } from '@angular/core';
import { UserInfoFormType } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-praise-teacher-reward',
  templateUrl: './praise-teacher-reward.component.html',
  styleUrls: ['./praise-teacher-reward.component.scss'],
})
export class PraiseTeacherRewardComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;
  rewardFiles = ['1. รางวัลอื่นและประกาศเกียรติคุณ'];

  constructor() {}

  ngOnInit(): void {}
}
