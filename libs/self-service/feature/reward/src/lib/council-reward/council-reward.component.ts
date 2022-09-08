import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-council-reward',
  templateUrl: './council-reward.component.html',
  styleUrls: ['./council-reward.component.scss'],
})
export class CouncilRewardComponent implements OnInit {
  rewardFiles = ['1. รางวัลอื่นและประกาศเกียรติคุณ'];

  constructor() {}

  ngOnInit(): void {}
}
