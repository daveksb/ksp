import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LicenseRequestService {
  educationFiles = [
    {
      name: 'สำเนาใบรายงานผลการศึกษา (Transcript)',
      fileId: '',
    },
    {
      name: 'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
      fileId: '',
    },
  ];

  experienceFiles = [
    {
      name: 'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง',
      fileId: '',
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
      fileId: '',
    },
    {
      name: 'สำเนาตารางสอนรายสัปดาห์',
      fileId: '',
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งปฏิบติหน้าที่',
      fileId: '',
    },
    {
      name: 'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
      fileId: '',
    },
  ];
}
