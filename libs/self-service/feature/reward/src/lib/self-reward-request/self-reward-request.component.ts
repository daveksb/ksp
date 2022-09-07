import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ksp-self-reward-request',
  templateUrl: './self-reward-request.component.html',
  styleUrls: ['./self-reward-request.component.scss'],
})
export class SelfRewardRequestComponent implements OnInit {
  pageType = 0;
  headerGroup = [
    'วันที่ทำรายการ',
    'เลขใบคำขอ',
    'เลขที่ประจำตัวคุรุสภา',
    'เลขประจำตัวประชาชน',
    'เลขที่ใบอนุญาต',
    'วันที่ออกใบอนุญาต',
    'วันที่หมดอายุใบอนุญาต',
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      //console.log('res = ', this.pageType);
    });
  }
}
