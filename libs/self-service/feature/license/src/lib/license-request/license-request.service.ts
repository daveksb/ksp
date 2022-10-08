import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LicenseRequestService {
  educationFiles = [
    {
      name: 'สำเนาใบรายงานผลการศึกษา (Transcript)',
      fileid: '',
      filename: '',
    },
    {
      name: 'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
      fileid: '',
      filename: '',
    },
  ];

  experienceFiles = [
    {
      name: 'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง',
      fileid: '',
      filename: '',
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
      fileid: '',
      filename: '',
    },
    {
      name: 'สำเนาตารางสอนรายสัปดาห์',
      fileid: '',
      filename: '',
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งปฏิบติหน้าที่',
      fileid: '',
      filename: '',
    },
    {
      name: 'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
      fileid: '',
      filename: '',
    },
  ];

  performanceFiles = [
    [
      {
        name: 'สำเนาผลการทดสอบ',
        fileid: '',
        filename: '',
      },
    ],
    [
      {
        name: 'สำเนาผลการทดสอบ',
        fileid: '',
        filename: '',
      },
    ],
    [
      {
        name: 'สำเนาผลการทดสอบ',
        fileid: '',
        filename: '',
      },
    ],
    [
      {
        name: 'สำเนาผลการทดสอบ',
        fileid: '',
        filename: '',
      },
    ],
  ];
}
