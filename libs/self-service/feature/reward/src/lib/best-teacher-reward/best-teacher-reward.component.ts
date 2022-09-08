import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-best-teacher-reward',
  templateUrl: './best-teacher-reward.component.html',
  styleUrls: ['./best-teacher-reward.component.scss'],
})
export class BestTeacherRewardComponent implements OnInit {
  rewardFiles = ['1. รางวัลอื่นและประกาศเกียรติคุณ'];

  constructor() {}

  ngOnInit(): void {}
}
