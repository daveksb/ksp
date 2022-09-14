import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-renew-license-education-manager',
  templateUrl: './renew-license-education-manager.component.html',
  styleUrls: ['./renew-license-education-manager.component.scss'],
})
export class RenewLicenseEducationManagerComponent implements OnInit {
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
