import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-research-reward',
  templateUrl: './research-reward.component.html',
  styleUrls: ['./research-reward.component.scss'],
})
export class ResearchRewardComponent implements OnInit {
  rewardFiles = ['1. รางวัลอื่นและประกาศเกียรติคุณ'];
  headerGroup = [
    'วันที่ทำรายการ',
    'เลขใบคำขอ',
    'เลขที่ประจำตัวคุรุสภา',
    'เลขประจำตัวประชาชน',
    'เลขที่ใบอนุญาต',
    'วันที่ออกใบอนุญาต',
    'วันที่หมดอายุใบอนุญาต',
  ];

  constructor() {}

  ngOnInit(): void {}
}
