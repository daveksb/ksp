import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LicenseRequestService {
  educationFiles = [
    {
      name: 'สำเนาใบรายงานผลการศึกษา (Transcript)',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
      fileId: '',
      fileName: '',
    },
  ];

  experienceFiles = [
    {
      name: 'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาตารางสอนรายสัปดาห์',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งปฏิบติหน้าที่',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
      fileId: '',
      fileName: '',
    },
  ];
}
