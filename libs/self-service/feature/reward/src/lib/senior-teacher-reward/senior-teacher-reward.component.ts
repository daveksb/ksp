import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-senior-teacher-reward',
  templateUrl: './senior-teacher-reward.component.html',
  styleUrls: ['./senior-teacher-reward.component.scss'],
})
export class SeniorTeacherRewardComponent implements OnInit {
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
