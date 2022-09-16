import { Component, OnInit } from '@angular/core';
import { UserInfoFormType } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-thai-teacher-reward',
  templateUrl: './thai-teacher-reward.component.html',
  styleUrls: ['./thai-teacher-reward.component.scss'],
})
export class ThaiTeacherRewardComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;
  rewardFiles = ['1. รางวัลอื่นและประกาศเกียรติคุณ'];

  constructor() {}

  ngOnInit(): void {}
}
