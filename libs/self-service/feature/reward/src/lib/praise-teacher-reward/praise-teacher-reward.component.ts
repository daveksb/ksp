import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-praise-teacher-reward',
  templateUrl: './praise-teacher-reward.component.html',
  styleUrls: ['./praise-teacher-reward.component.scss'],
})
export class PraiseTeacherRewardComponent implements OnInit {
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
