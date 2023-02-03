import { Injectable } from '@angular/core';
import { FileGroup } from '@ksp/shared/interface';

@Injectable({
  providedIn: 'root',
})
export class LicenseRequestService {
  educationFiles: FileGroup[] = [
    {
      name: 'สำเนาใบรายงานผลการศึกษา (Transcript)',
      files: [],
    },
    {
      name: 'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
      files: [],
    },
  ];

  experienceFiles: FileGroup[] = [
    {
      name: 'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง',
      files: [],
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
      files: [],
    },
    {
      name: 'สำเนาตารางสอนรายสัปดาห์',
      files: [],
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งปฏิบติหน้าที่',
      files: [],
    },
    {
      name: 'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
      files: [],
    },
  ];

  performanceFiles: FileGroup[][] = [
    [
      {
        name: 'สำเนาผลการทดสอบ',
        files: [],
      },
    ],
    [
      {
        name: 'สำเนาผลการทดสอบ',
        files: [],
      },
    ],
    [
      {
        name: 'สำเนาผลการทดสอบ',
        files: [],
      },
    ],
    [
      {
        name: 'สำเนาผลการทดสอบ',
        files: [],
      },
    ],
  ];
}
