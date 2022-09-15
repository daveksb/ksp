import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-renew-license-school-manager',
  templateUrl: './renew-license-school-manager.component.html',
  styleUrls: ['./renew-license-school-manager.component.scss'],
})
export class RenewLicenseSchoolManagerComponent implements OnInit {
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
