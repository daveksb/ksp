import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-thai-teacher-reward',
  templateUrl: './thai-teacher-reward.component.html',
  styleUrls: ['./thai-teacher-reward.component.scss'],
})
export class ThaiTeacherRewardComponent implements OnInit {
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
