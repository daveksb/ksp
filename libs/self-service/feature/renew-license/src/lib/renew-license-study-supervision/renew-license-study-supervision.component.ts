import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-renew-license-study-supervision',
  templateUrl: './renew-license-study-supervision.component.html',
  styleUrls: ['./renew-license-study-supervision.component.scss'],
})
export class RenewLicenseStudySupervisionComponent implements OnInit {
  headerGroup = [
    'วันที่ทำรายการ',
    'เลขใบคำขอ',
    'เลขที่ใบอนุญาต',
    'เลขที่ประจำตัวคุรุสภา',
    'เลขประจำตัวประชาชน',
    'วันที่ออกใบอนุญาต',
    'วันที่หมดอายุใบอนุญาต',
  ];
  
  constructor() {}

  ngOnInit(): void {}
}
