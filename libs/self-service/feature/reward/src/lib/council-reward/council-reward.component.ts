import { Component, OnInit } from '@angular/core';
import { UserInfoFormType } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-council-reward',
  templateUrl: './council-reward.component.html',
  styleUrls: ['./council-reward.component.scss'],
})
export class CouncilRewardComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;
  rewardFiles = ['1. รางวัลอื่นและประกาศเกียรติคุณ'];

  constructor() {}

  ngOnInit(): void {}
}
