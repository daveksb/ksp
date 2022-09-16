import { Component, OnInit } from '@angular/core';
import { UserInfoFormType } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-senior-teacher-reward',
  templateUrl: './senior-teacher-reward.component.html',
  styleUrls: ['./senior-teacher-reward.component.scss'],
})
export class SeniorTeacherRewardComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;
  rewardFiles = ['1. รางวัลอื่นและประกาศเกียรติคุณ'];

  constructor() {}

  ngOnInit(): void {}
}
