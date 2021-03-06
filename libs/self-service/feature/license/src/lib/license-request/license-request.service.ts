import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LicenseRequestService {
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
