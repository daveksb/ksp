import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-council-reward',
  templateUrl: './council-reward.component.html',
  styleUrls: ['./council-reward.component.scss'],
})
export class CouncilRewardComponent implements OnInit {
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
