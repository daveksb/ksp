import { Component } from '@angular/core';

@Component({
  selector: 'self-service-license-request',
  templateUrl: './license-request.component.html',
  styleUrls: ['./license-request.component.css'],
})
export class LicenseRequestComponent {
  educationFiles = [
    'สำเนาใบรายงานผลการศึกษา (Transcript)',
    'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
  ];

  experienceFiles = [
    'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง',
    'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
    'สำเนาตารางสอนรายสัปดาห์',
    'สำเนาคำสั่งแต่งตั้งปฏิบติหน้าที่',
    'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
  ];
}
